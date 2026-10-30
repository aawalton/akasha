import { LOG } from "akasha/agent/seat/supervisor/modules/supervisor-config/supervisor-config.module.code.ts"
import {
  isProcessAlive,
  signalPid,
  waitForPidExit,
} from "akasha/agent/seat/supervisor/modules/supervisor-exec/supervisor-exec.module.code.ts"
import type { InheritedProc } from "akasha/agent/seat/supervisor/modules/supervisor-types/supervisor-types.module.code.ts"
import {
  type ChildExitStatus,
  collapseChildExitStatus,
} from "akasha/agent/seat/supervisor/seat-agent-start/modules/supervisor-child-exit-decide/supervisor-child-exit-decide.module.code.ts"
import type { SupervisorHandoff } from "akasha/agent/seat/supervisor-restart/modules/supervisor-handoff-env/supervisor-handoff-env.module.code.ts"

export function adoptInheritedProc(pid: number): InheritedProc {
  if (!isProcessAlive(pid)) {
    throw new InheritedPidDeadError(pid)
  }
  let killed = false
  let observed: ChildExitStatus = { exitCode: null, signal: null }
  const waited = waitForPidExit(pid).then((status) => {
    observed = status
    return status
  })
  return {
    pid,
    exited: waited.then(collapseChildExitStatus),
    exitStatus: () => observed,
    kill: (_signal?: string | number) => {
      if (killed) return
      killed = true
      try {
        signalPid(pid, "SIGTERM")
      } catch (err) {
        console.error(`${LOG} signalPid(${pid}, SIGTERM) failed:`, err)
      }
    },
  }
}

export class InheritedPidDeadError extends Error {
  constructor(pid: number) {
    super(`inherited Claude PID ${pid} is not alive at boot — falling through to fresh spawn`)
    this.name = "InheritedPidDeadError"
  }
}

export function resolveClaudeHandoff(
  handoff: Pick<SupervisorHandoff, "claude">,
  inplaceFlag: string | undefined
): SupervisorHandoff["claude"] {
  if (inplaceFlag === "0") return null
  if (!handoff.claude) return null
  try {
    if (!isProcessAlive(handoff.claude.pid)) {
      console.warn(
        `${LOG} inherited Claude PID ${handoff.claude.pid} is not alive at boot — falling through to fresh spawn`
      )
      return null
    }
  } catch (err) {
    console.warn(`${LOG} isProcessAlive(${handoff.claude.pid}) failed:`, err)
    return null
  }
  return handoff.claude
}
