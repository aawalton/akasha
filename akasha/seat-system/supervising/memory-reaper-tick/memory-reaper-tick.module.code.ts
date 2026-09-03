import { readMemInfoKb } from "@akasha/utils-system/memory-guard"
import {
  GLOBAL_MIN_AVAIL_KB,
  GLOBAL_MIN_FREE_SWAP_KB,
  LOG,
  RECOVERY_WINDOW_MS,
  THRESHOLD_KB,
  TREE_THRESHOLD_KB,
} from "../memory-reaper-config/memory-reaper-config.module.code.ts"
import {
  assessGlobalKill,
  assessRecoveryWindow,
  type GlobalKillTarget,
} from "../memory-reaper-global/memory-reaper-global.module.code.ts"
import {
  killPidWithTimeout,
  killTreeWithTimeout,
} from "../memory-reaper-kill/memory-reaper-kill.module.code.ts"
import { planReaperKills } from "../memory-reaper-plan/memory-reaper-plan.module.code.ts"
import {
  type PidSnapshot,
  readContainerPids,
} from "../memory-reaper-proc-scan/memory-reaper-proc-scan.module.code.ts"
import {
  readPidArgv,
  readSupervisorPids,
  readUserPidSnapshots,
} from "../memory-reaper-read/memory-reaper-read.module.code.ts"
import { withTickDeadline } from "../tick-deadline/tick-deadline.module.code.ts"

export type ReaperState = { lastGlobalKillAtMs: number | null }

export async function runReaperTick(
  state: ReaperState,
  readSnapshots: (uid: number) => readonly PidSnapshot[] = readUserPidSnapshots
): Promise<void> {
  const uid = process.getuid?.()
  if (uid === undefined) return
  const selfPid = process.pid

  let allSnapshots: readonly PidSnapshot[]
  try {
    allSnapshots = readSnapshots(uid)
  } catch (err) {
    console.error(`${LOG} snapshot read threw:`, err)
    return
  }

  const containerPids = new Set(readContainerPids(allSnapshots))
  const snapshots = allSnapshots.filter((s) => !containerPids.has(s.pid))
  const supervisorPids = readSupervisorPids(snapshots)

  let availableKb = Number.POSITIVE_INFINITY
  let swapTotalKb = 0
  let swapFreeKb = Number.POSITIVE_INFINITY
  try {
    const meminfo = readMemInfoKb()
    availableKb = meminfo.availableKb
    swapTotalKb = meminfo.swapTotalKb
    swapFreeKb = meminfo.swapFreeKb
  } catch (err) {
    console.error(`${LOG} readMemInfoKb threw (headroom leg disarmed this tick):`, err)
  }
  const globalDecision = assessGlobalKill({
    snapshots,
    supervisorPids,
    availableKb,
    swapTotalKb,
    swapFreeKb,
    minAvailKb: GLOBAL_MIN_AVAIL_KB,
    minFreeSwapKb: GLOBAL_MIN_FREE_SWAP_KB,
  })
  const recovery = assessRecoveryWindow({
    globalTripped: globalDecision.kill,
    nowMs: Date.now(),
    lastGlobalKillAtMs: state.lastGlobalKillAtMs,
    recoveryWindowMs: RECOVERY_WINDOW_MS,
  })
  if (recovery.recovered) state.lastGlobalKillAtMs = null
  let globalTarget: GlobalKillTarget | null = null
  if (globalDecision.kill && globalDecision.target !== null) {
    if (recovery.execute) {
      console.log(`${LOG} ${globalDecision.reason} (${recovery.reason})`)
      state.lastGlobalKillAtMs = Date.now()
      globalTarget = globalDecision.target
    } else {
      console.log(`${LOG} ${globalDecision.reason} — SUPPRESSED: ${recovery.reason}`)
    }
  }

  const plan = planReaperKills({
    snapshots,
    supervisorPids,
    selfPid,
    perProcessThresholdKb: THRESHOLD_KB,
    perTreeThresholdKb: TREE_THRESHOLD_KB,
    globalTarget,
    readArgv: readPidArgv,
  })

  for (const p of plan.procKills) if (p.leg !== "host-global") console.log(`${LOG} ${p.reason}`)
  for (const t of plan.treeKills) if (t.leg !== "host-global") console.log(`${LOG} ${t.reason}`)
  for (const s of plan.sparedTrees) console.log(`${LOG} ${s.reason}`)

  for (const t of plan.treeKills) {
    if (t.disposition === "already-planned") continue
    if (t.disposition === "refused-contains-self") {
      console.error(
        `${LOG} refusing to kill tree root=${t.rootPid} that contains self pid=${selfPid}`
      )
      continue
    }
    if (t.disposition === "refused-spans-seats") {
      const seats = t.seats ?? []
      console.error(
        `${LOG} refusing to kill tree root=${t.rootPid}: it holds ${seats.length} seats ` +
          `(${seats.join(", ")}) — the per-tree ceiling answers one runaway seat, not the fleet`
      )
      continue
    }
    const ordered = [...t.descendantPids, t.rootPid]
    try {
      await killTreeWithTimeout(ordered)
    } catch (err) {
      console.error(`${LOG} killTree root=${t.rootPid} threw:`, err)
    }
  }

  for (const p of plan.procKills) {
    if (p.disposition !== "signalled") continue
    try {
      await killPidWithTimeout(p.pid)
    } catch (err) {
      console.error(`${LOG} killPid pid=${p.pid} threw:`, err)
    }
  }
}

export const REAPER_TICK_DEADLINE_MS = 60_000

export function runBoundedReaperTick(
  state: ReaperState,
  signal: AbortSignal,
  deadlineMs: number = REAPER_TICK_DEADLINE_MS,
  tick: (s: ReaperState) => Promise<void> = runReaperTick
): Promise<void> {
  return withTickDeadline(LOG, () => tick(state), deadlineMs, signal)
}
