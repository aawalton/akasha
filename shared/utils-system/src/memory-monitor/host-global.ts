import { assessTreeKills, type TreeKillResult } from "./per-tree"
import { KB_PER_GB, type PidSnapshot } from "./shared"

export const GLOBAL_MIN_AVAIL_GB = 4

export const GLOBAL_MIN_FREE_SWAP_GB = 4

export type GlobalKillInput = {
  snapshots: readonly PidSnapshot[]
  supervisorPids: readonly number[]
  availableKb: number
  swapTotalKb: number
  swapFreeKb: number
  minAvailKb: number
  minFreeSwapKb: number
}

export type GlobalKillTarget =
  | { kind: "tree"; rootPid: number; descendantPids: readonly number[]; treeRssKb: number }
  | { kind: "pid"; pid: number; vmRssKb: number; name: string }

export type GlobalKillDecision = {
  kill: boolean
  reason: string
  target: GlobalKillTarget | null
}

export function assessGlobalKill(input: GlobalKillInput): GlobalKillDecision {
  const availGb = (input.availableKb / KB_PER_GB).toFixed(1)
  const minAvailGb = (input.minAvailKb / KB_PER_GB).toFixed(1)

  const swapDrained = input.swapTotalKb === 0 || input.swapFreeKb <= input.minFreeSwapKb
  const headroomTrigger = swapDrained && input.availableKb <= input.minAvailKb
  if (!headroomTrigger) {
    return {
      kill: false,
      reason: `MemAvailable ${availGb} GB`,
      target: null,
    }
  }
  const triggerReason = `MemAvailable ${availGb} GB at/under ${minAvailGb} GB pre-OOM margin with swap drained`

  const treeResults = assessTreeKills({
    snapshots: input.snapshots,
    supervisorPids: input.supervisorPids,
    perTreeThresholdKb: Number.POSITIVE_INFINITY,
    perProcessKillPids: [],
  })
  let largestTree: TreeKillResult | undefined
  for (const t of treeResults) {
    if (largestTree === undefined || t.treeRssKb > largestTree.treeRssKb) largestTree = t
  }
  if (largestTree !== undefined && largestTree.treeRssKb > 0) {
    const treeGb = (largestTree.treeRssKb / KB_PER_GB).toFixed(1)
    return {
      kill: true,
      reason: `${triggerReason} — killing largest supervisor tree root=${largestTree.rootPid} (tree VmRSS ${treeGb} GB)`,
      target: {
        kind: "tree",
        rootPid: largestTree.rootPid,
        descendantPids: largestTree.descendantPids,
        treeRssKb: largestTree.treeRssKb,
      },
    }
  }

  let largestPid: PidSnapshot | undefined
  for (const s of input.snapshots) {
    if (largestPid === undefined || s.vmRssKb > largestPid.vmRssKb) largestPid = s
  }
  if (largestPid === undefined) {
    return {
      kill: false,
      reason: `${triggerReason} but no kill target found`,
      target: null,
    }
  }
  const pidGb = (largestPid.vmRssKb / KB_PER_GB).toFixed(1)
  return {
    kill: true,
    reason: `${triggerReason} — killing largest pid=${largestPid.pid} (${largestPid.name}, VmRSS ${pidGb} GB)`,
    target: {
      kind: "pid",
      pid: largestPid.pid,
      vmRssKb: largestPid.vmRssKb,
      name: largestPid.name,
    },
  }
}
