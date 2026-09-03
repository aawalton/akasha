import {
  isClaudeChildCmdline,
  type ProcLivenessEntry,
} from "@akasha/seat-system/seat-proc-liveness"
import { enforceMemoryGuard } from "@akasha/utils-system/memory-guard"
import { scanProcEntries } from "@tools/lib/proc-scan"
import type { InheritedProc } from "@tools/lib/supervisor-types"
import {
  adoptInheritedProc,
  InheritedPidDeadError,
  type resolveClaudeHandoff,
  spawnClaudeChild,
} from "../supervisor-adopt/supervisor-adopt.module.code.ts"
import type { ChildExitRuleSource } from "../supervisor-child-exit-rule/supervisor-child-exit-rule.module.code.ts"
import { LOG } from "../supervisor-config/supervisor-config.module.code.ts"

export type ProcScan = () => { ok: boolean; entries: readonly ProcLivenessEntry[] }

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
  childExitRule: ChildExitRuleSource
  scanProcs: ProcScan
}): { proc: InheritedProc; adoptedThisIter: boolean } {
  const { spawnOpts, childExitRule, scanProcs } = args
  const scanned = scanProcs()
  const standing = scanned.ok
    ? findLiveClaudeChild(spawnOpts.agentId, scanned.entries, process.pid)
    : null
  if (standing !== null) {
    try {
      const proc = adoptInheritedProc(standing, childExitRule)
      console.log(
        `${LOG} adopt: Claude pid=${standing} is already this supervisor's child for agent ${spawnOpts.agentId} — adopting it rather than spawning a second onto the same terminal`
      )
      return { proc, adoptedThisIter: true }
    } catch (err) {
      console.error(`${LOG} adopt: standing Claude pid=${standing} could not be adopted:`, err)
    }
  }
  enforceMemoryGuard("claude session")
  return { proc: spawnClaudeChild(spawnOpts), adoptedThisIter: false }
}

export function spawnOrAdoptChild(args: {
  adoptOnce: ReturnType<typeof resolveClaudeHandoff>
  spawnOpts: Parameters<typeof spawnClaudeChild>[0]
  childExitRule: ChildExitRuleSource
  scanProcs?: ProcScan
}): { proc: InheritedProc | null; adoptedThisIter: boolean } {
  const { adoptOnce, spawnOpts, childExitRule } = args
  const scanProcs = args.scanProcs ?? scanProcEntries
  if (adoptOnce) {
    try {
      const proc = adoptInheritedProc(adoptOnce.pid, childExitRule)
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
      return adoptLiveChildOrSpawn({ spawnOpts, childExitRule, scanProcs })
    }
  }
  console.log(`${LOG} Running interactively in ${spawnOpts.cwd} (agent ${spawnOpts.agentId})`)
  return adoptLiveChildOrSpawn({ spawnOpts, childExitRule, scanProcs })
}
