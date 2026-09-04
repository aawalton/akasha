import type { PidSnapshot } from "../memory-reaper-proc-scan/memory-reaper-proc-scan.module.code.ts"

export const KB_PER_GB = 1024 * 1024

export type MemoryKillDecision = {
  kill: boolean
  reason: string
}

export const MAX_RSS_GB = 32

export type MemoryKillInput = {
  rssKb: number
  thresholdKb: number
  kindLabel: string
  pid: number
}

export function assessMemoryKill(input: MemoryKillInput): MemoryKillDecision {
  const rssGb = (input.rssKb / KB_PER_GB).toFixed(1)
  const thresholdGb = (input.thresholdKb / KB_PER_GB).toFixed(1)
  if (input.rssKb > input.thresholdKb) {
    return {
      kill: true,
      reason: `killing ${input.kindLabel} pid=${input.pid}: VmRSS ${rssGb} GB exceeds ${thresholdGb} GB ceiling`,
    }
  }
  return {
    kill: false,
    reason: `${input.kindLabel} pid=${input.pid}: VmRSS ${rssGb} GB`,
  }
}

export const MAX_TREE_PSS_GB = 32

export type TreeKillInput = {
  snapshots: readonly PidSnapshot[]
  supervisorPids: readonly number[]
  perTreeThresholdKb: number
  perProcessKillPids: readonly number[]
}

export type TreeKillResult = {
  rootPid: number
  treePssKb: number
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

export function assessTreeKills(input: TreeKillInput): readonly TreeKillResult[] {
  const childrenByPpid = buildChildrenMap(input.snapshots)
  const pssByPid = new Map(input.snapshots.map((s) => [s.pid, s.pssKb]))
  const rootPids = selectTopmostSupervisors(input.supervisorPids, input.snapshots)
  const reclaimedPids = new Set(input.perProcessKillPids)
  const results: TreeKillResult[] = []
  for (const rootPid of rootPids) {
    const { descendantPids, allPids } = collectSubtree(rootPid, childrenByPpid)
    let treePssKb = 0
    for (const pid of allPids) {
      if (reclaimedPids.has(pid)) continue
      treePssKb += pssByPid.get(pid) ?? 0
    }
    const treeGb = (treePssKb / KB_PER_GB).toFixed(1)
    const thresholdGb = (input.perTreeThresholdKb / KB_PER_GB).toFixed(1)
    const overThreshold = treePssKb > input.perTreeThresholdKb
    const reason = overThreshold
      ? `killing supervisor tree root=${rootPid} (descendants=${descendantPids.length}): tree PSS ${treeGb} GB exceeds ${thresholdGb} GB ceiling`
      : `supervisor tree root=${rootPid} (descendants=${descendantPids.length}): tree PSS ${treeGb} GB`
    results.push({
      rootPid,
      treePssKb,
      descendantPids,
      decision: { kill: overThreshold, reason },
    })
  }
  return results
}
