import { KB_PER_GB, type MemoryKillDecision, type PidSnapshot } from "./shared"

export const MAX_TREE_RSS_GB = 24

export type TreeKillInput = {
  snapshots: readonly PidSnapshot[]
  supervisorPids: readonly number[]
  perTreeThresholdKb: number
  perProcessKillPids: readonly number[]
}

export type TreeKillResult = {
  rootPid: number
  treeRssKb: number
  descendantPids: readonly number[]
  decision: MemoryKillDecision
}

function buildChildrenMap(snapshots: readonly PidSnapshot[]): Map<number, number[]> {
  const childrenByPpid = new Map<number, number[]>()
  for (const s of snapshots) {
    const list = childrenByPpid.get(s.ppid)
    if (list === undefined) childrenByPpid.set(s.ppid, [s.pid])
    else list.push(s.pid)
  }
  return childrenByPpid
}

function collectSubtree(
  rootPid: number,
  childrenByPpid: ReadonlyMap<number, readonly number[]>
): { descendantPids: readonly number[]; allPids: readonly number[] } {
  const descendantPids: number[] = []
  const stack: number[] = [...(childrenByPpid.get(rootPid) ?? [])]
  while (stack.length > 0) {
    const pid = stack.pop()
    if (pid === undefined) break
    descendantPids.push(pid)
    const grandchildren = childrenByPpid.get(pid)
    if (grandchildren !== undefined) stack.push(...grandchildren)
  }
  return { descendantPids, allPids: [rootPid, ...descendantPids] }
}

export function selectTopmostSupervisors(
  supervisorPids: readonly number[],
  snapshots: readonly PidSnapshot[]
): readonly number[] {
  const ppidByPid = new Map(snapshots.map((s) => [s.pid, s.ppid]))
  const supervisorSet = new Set(supervisorPids)
  const hasSupervisorAncestor = (pid: number): boolean => {
    const seen = new Set<number>([pid])
    let cur = ppidByPid.get(pid)
    while (cur !== undefined && cur > 1 && !seen.has(cur)) {
      if (supervisorSet.has(cur)) return true
      seen.add(cur)
      cur = ppidByPid.get(cur)
    }
    return false
  }
  return supervisorPids.filter((pid) => !hasSupervisorAncestor(pid))
}

export type SelfTreeInput = {
  snapshots: readonly PidSnapshot[]
  selfPid: number
  supervisorPids: readonly number[]
}

export function selectSelfTreeRoot(input: SelfTreeInput): number | null {
  const ppidByPid = new Map(input.snapshots.map((s) => [s.pid, s.ppid]))
  const supervisorSet = new Set(input.supervisorPids)
  const seen = new Set<number>()
  let outermost: number | null = null
  let cur: number | undefined = input.selfPid
  while (cur !== undefined && cur > 1 && !seen.has(cur)) {
    if (supervisorSet.has(cur)) outermost = cur
    seen.add(cur)
    cur = ppidByPid.get(cur)
  }
  return outermost
}

export function assessTreeKills(input: TreeKillInput): readonly TreeKillResult[] {
  const childrenByPpid = buildChildrenMap(input.snapshots)
  const rssByPid = new Map(input.snapshots.map((s) => [s.pid, s.vmRssKb]))
  const rootPids = selectTopmostSupervisors(input.supervisorPids, input.snapshots)
  const reclaimedPids = new Set(input.perProcessKillPids)
  const results: TreeKillResult[] = []
  for (const rootPid of rootPids) {
    const { descendantPids, allPids } = collectSubtree(rootPid, childrenByPpid)
    let treeRssKb = 0
    for (const pid of allPids) {
      if (reclaimedPids.has(pid)) continue
      treeRssKb += rssByPid.get(pid) ?? 0
    }
    const treeGb = (treeRssKb / KB_PER_GB).toFixed(1)
    const thresholdGb = (input.perTreeThresholdKb / KB_PER_GB).toFixed(1)
    const overThreshold = treeRssKb > input.perTreeThresholdKb
    const reason = overThreshold
      ? `killing supervisor tree root=${rootPid} (descendants=${descendantPids.length}): tree VmRSS ${treeGb} GB exceeds ${thresholdGb} GB ceiling`
      : `supervisor tree root=${rootPid} (descendants=${descendantPids.length}): tree VmRSS ${treeGb} GB`
    results.push({
      rootPid,
      treeRssKb,
      descendantPids,
      decision: { kill: overThreshold, reason },
    })
  }
  return results
}
