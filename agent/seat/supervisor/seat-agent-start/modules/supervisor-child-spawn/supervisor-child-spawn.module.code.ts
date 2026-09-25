import {
  isClaudeChildCmdline,
  type ProcLivenessEntry,
} from "akasha/agent/modules/proc-liveness/agent-proc-liveness.module.code.ts"
import { scanProcEntries } from "akasha/agent/modules/proc-scan/proc-scan.module.code.ts"
import { takeOpenShells } from "akasha/agent/seat/observation/seat-turn/modules/turn-working/turn-working.module.code.ts"
import { LOG } from "akasha/agent/seat/supervisor/modules/supervisor-config/supervisor-config.module.code.ts"
import type { InheritedProc } from "akasha/agent/seat/supervisor/modules/supervisor-types/supervisor-types.module.code.ts"
import {
  adoptInheritedProc,
  InheritedPidDeadError,
  type resolveClaudeHandoff,
  spawnClaudeChild,
} from "akasha/agent/seat/supervisor/seat-agent-start/modules/supervisor-adopt/supervisor-adopt.module.code.ts"
import { sweepSubagentPagesOf } from "akasha/agent/subagent/modules/pages-sweeping/subagent-pages-sweeping.module.code.ts"
import { enforceMemoryGuard } from "akasha/infrastructure/kernel/modules/memory-guard/memory-guard.module.code.ts"

type ProcScan = () => { ok: boolean; entries: readonly ProcLivenessEntry[] }

export const SPAWNED_FRESH = "has a client spawned in place of the one that ran them"

export interface ChildSpawnSeams {
  readonly scanProcs: ProcScan
  readonly adoptProc: typeof adoptInheritedProc
  readonly spawnChild: typeof spawnClaudeChild
  readonly admitSpawn: typeof enforceMemoryGuard
  readonly takeShells: typeof takeOpenShells
  readonly sweepSubagents: typeof sweepSubagentPagesOf
}

function seamsOf(given: Partial<ChildSpawnSeams> = {}): ChildSpawnSeams {
  return {
    scanProcs: given.scanProcs ?? scanProcEntries,
    adoptProc: given.adoptProc ?? adoptInheritedProc,
    spawnChild: given.spawnChild ?? spawnClaudeChild,
    admitSpawn: given.admitSpawn ?? enforceMemoryGuard,
    takeShells: given.takeShells ?? takeOpenShells,
    sweepSubagents: given.sweepSubagents ?? sweepSubagentPagesOf,
  }
}

export function findLiveClaudeChild(
  agentId: string,
  entries: readonly ProcLivenessEntry[],
  supervisorPid: number
): number | null {
  for (const entry of entries) {
    if (entry.agentId !== agentId) continue
    if (entry.ppid !== supervisorPid) continue
    if (!isClaudeChildCmdline(entry.cmdline)) continue
    return entry.pid
  }
  return null
}

function adoptLiveChildOrSpawn(args: {
  spawnOpts: Parameters<typeof spawnClaudeChild>[0]
  seams: ChildSpawnSeams
}): { proc: InheritedProc; adoptedThisIter: boolean } {
  const { spawnOpts, seams } = args
  const scanned = seams.scanProcs()
  const livePid = scanned.ok
    ? findLiveClaudeChild(spawnOpts.agentId, scanned.entries, process.pid)
    : null
  if (livePid !== null) {
    try {
      const proc = seams.adoptProc(livePid)
      console.log(
        `${LOG} adopt: Claude pid=${livePid} is already this supervisor's child for agent ${spawnOpts.agentId} — adopting it rather than spawning a second onto the same terminal`
      )
      return { proc, adoptedThisIter: true }
    } catch (err) {
      console.error(`${LOG} adopt: live Claude pid=${livePid} could not be adopted:`, err)
    }
  }
  seams.takeShells(spawnOpts.agentId)
  seams.sweepSubagents(spawnOpts.agentId, SPAWNED_FRESH)
  seams.admitSpawn("claude session")
  return { proc: seams.spawnChild(spawnOpts), adoptedThisIter: false }
}

export function spawnOrAdoptChild(args: {
  adoptOnce: ReturnType<typeof resolveClaudeHandoff>
  spawnOpts: Parameters<typeof spawnClaudeChild>[0]
  seams?: Partial<ChildSpawnSeams>
}): { proc: InheritedProc | null; adoptedThisIter: boolean } {
  const { adoptOnce, spawnOpts } = args
  const seams = seamsOf(args.seams)
  if (adoptOnce) {
    try {
      const proc = seams.adoptProc(adoptOnce.pid)
      console.log(
        `${LOG} adopt: skipped Bun.spawn — adopted Claude pid=${adoptOnce.pid} (agent ${spawnOpts.agentId})`
      )
      return { proc, adoptedThisIter: true }
    } catch (err) {
      const pidConfirmedDead = err instanceof InheritedPidDeadError
      if (err instanceof InheritedPidDeadError) {
        console.warn(`${LOG} ${err.message}`)
      } else {
        console.error(`${LOG} adopt: failed to adopt inherited PID:`, err)
      }
      if (pidConfirmedDead) {
        console.warn(
          `${LOG} adopt: inherited PID ${adoptOnce.pid} confirmed dead — NOT respawning (never-auto-restart) (agent ${spawnOpts.agentId})`
        )
        return { proc: null, adoptedThisIter: false }
      }
      console.warn(
        `${LOG} adopt: liveness of inherited PID ${adoptOnce.pid} unknown — recovering with a fresh --resume spawn (agent ${spawnOpts.agentId})`
      )
      return adoptLiveChildOrSpawn({ spawnOpts, seams })
    }
  }
  console.log(`${LOG} Running interactively in ${spawnOpts.cwd} (agent ${spawnOpts.agentId})`)
  return adoptLiveChildOrSpawn({ spawnOpts, seams })
}
