import { attemptInPlaceReExec } from "akasha/agent/seat/self-healing/modules/supervisor-reexec/supervisor-reexec.module.code.ts"
import { resolveReExecArgv } from "akasha/agent/seat/self-healing/modules/supervisor-self-heal/supervisor-self-heal.module.code.ts"
import {
  getCurrentAgentIdForSelfHeal,
  isPendingReExec,
  SUPERVISOR_SCRIPT,
} from "akasha/agent/seat/self-healing/modules/supervisor-self-heal-state/supervisor-self-heal-state.module.code.ts"
import type { ChildExitRuleSource } from "akasha/agent/seat/supervisor/supervisor-child/modules/exit-rule/supervisor-child-exit-rule.module.code.ts"
import { LOG } from "akasha/agent/seat/supervisor/supervisor-process/modules/supervisor-config/supervisor-config.module.code.ts"
import {
  getObservedChildExit,
  isShuttingDown,
  processes,
  setShuttingDown,
} from "akasha/agent/seat/supervisor/supervisor-process/modules/supervisor-state/supervisor-state.module.code.ts"
import {
  killProcessesForShutdown,
  recordShutdownEvent,
} from "akasha/agent/seat/supervisor/supervisor-shutdown/modules/procs/supervisor-shutdown-procs.module.code.ts"
import { shouldWriteTerminalStoppedStatus } from "akasha/agent/seat/supervisor/supervisor-shutdown/modules/supervisor-lifecycle-death-write/supervisor-lifecycle-death-write.module.code.ts"
import { takeSeatPage } from "akasha/agent/seat/supervisor/supervisor-ticking/modules/supervisor-heartbeat-beat/supervisor-heartbeat-beat.module.code.ts"
import { SHAPE } from "akasha/code/type/narrowing/modules/shape/shape.module.code.ts"

const SHUTDOWN_FORCE_EXIT_MS = 10_000
const SHUTDOWN_SIGKILL_BACKSTOP_MS = 1_500

function inplaceReExecEnabled(): boolean {
  return SHAPE.string().optional().parse(process.env.SUPERVISOR_USE_INPLACE_REEXEC) !== "0"
}

async function reExecSupervisor(): Promise<never> {
  console.log(`${LOG} Re-execing supervisor to load latest on-disk bytecode`)
  const reExecArgv = [process.execPath, SUPERVISOR_SCRIPT, ...resolveReExecArgv()]
  if (inplaceReExecEnabled()) {
    attemptInPlaceReExec(process.execPath, reExecArgv)
  }
  const child = Bun.spawn(reExecArgv, {
    stdio: ["inherit", "inherit", "inherit"],
    cwd: process.cwd(),
    env: process.env,
  })
  const code = await child.exited
  process.exit(code)
}

export function armForceExitTimer(signal: string): () => void {
  const forceTimer = setTimeout(() => {
    recordShutdownEvent("force-exit", {
      signal,
      processes: processes.size,
      pendingReExec: isPendingReExec(),
    })
    if (isPendingReExec() && inplaceReExecEnabled()) {
      recordShutdownEvent("force-exit-reexec")
      attemptInPlaceReExec(process.execPath, [
        process.execPath,
        SUPERVISOR_SCRIPT,
        ...resolveReExecArgv(),
      ])
      recordShutdownEvent("force-exit-reexec-unreached")
    }
    setTimeout(() => {
      recordShutdownEvent("sigkill-backstop", { signal })
      try {
        process.kill(process.pid, "SIGKILL")
      } catch {}
    }, SHUTDOWN_SIGKILL_BACKSTOP_MS).unref()
    process.exit(1)
  }, SHUTDOWN_FORCE_EXIT_MS)
  forceTimer.unref()
  return () => clearTimeout(forceTimer)
}

export async function shutdown(signal: string, childExitRule: ChildExitRuleSource): Promise<void> {
  if (isShuttingDown()) {
    recordShutdownEvent("re-entry-noop", { signal })
    return
  }
  setShuttingDown(true)
  const disarmForceExit = armForceExitTimer(signal)
  recordShutdownEvent("entry", {
    signal,
    processes: processes.size,
    pendingReExec: isPendingReExec(),
  })

  if (isPendingReExec() && inplaceReExecEnabled()) {
    recordShutdownEvent("entering-reexec", { inplace: true })
    await reExecSupervisor()
  }

  const childExit = getObservedChildExit()
  const { value: exitWrite, notice: exitWriteNotice } = await childExitRule.shutdownWrite(childExit)
  if (exitWrite === null) recordShutdownEvent("exit-write-unreached", { reason: exitWriteNotice })

  if (shouldWriteTerminalStoppedStatus(isPendingReExec())) {
    const dyingAgentId = getCurrentAgentIdForSelfHeal()
    if (
      dyingAgentId !== null &&
      exitWrite !== null &&
      !exitWrite.stampCleanExit &&
      childExit !== null
    ) {
      recordShutdownEvent("child-crash", { agentId: dyingAgentId, reason: childExit.reason })
    }
  }

  const preserveClaude = inplaceReExecEnabled() && isPendingReExec()
  await killProcessesForShutdown(preserveClaude)
  recordShutdownEvent("after-kill-procs", { preserveClaude })

  if (shouldWriteTerminalStoppedStatus(isPendingReExec())) {
    const dyingAgentId = getCurrentAgentIdForSelfHeal()
    if (dyingAgentId !== null && exitWrite !== null) {
      const pageTaken = takeSeatPage(dyingAgentId, exitWrite.stopReason)
      recordShutdownEvent("seat-page-remove", {
        agentId: dyingAgentId,
        outcome: pageTaken.kind,
        detail: pageTaken.kind === "refused" ? pageTaken.detail : undefined,
      })
    } else if (dyingAgentId !== null) {
      recordShutdownEvent("seat-page-remove-skip-unreached", { agentId: dyingAgentId })
    } else {
      recordShutdownEvent("seat-page-remove-skip-no-agent")
    }
  } else {
    recordShutdownEvent("seat-page-remove-skip-reexec")
  }

  if (isPendingReExec()) {
    recordShutdownEvent("entering-reexec", { inplace: false })
    await reExecSupervisor()
  }

  recordShutdownEvent("pre-process-exit")
  disarmForceExit()
  process.exit(0)
}
