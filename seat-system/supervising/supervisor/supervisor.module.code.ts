import { parseArgs } from "akasha/seat-system/supervising/supervisor-args/supervisor-args.module.code.ts"
import { LIVE_CHILD_EXIT_RULE } from "akasha/seat-system/supervising/supervisor-child-exit-rule/supervisor-child-exit-rule.module.code.ts"
import {
  assertBootFiles,
  LOG,
  REQUIRED_BOOT_FILES,
} from "akasha/seat-system/supervising/supervisor-config/supervisor-config.module.code.ts"
import { buildAgentLogRedirect } from "akasha/seat-system/supervising/supervisor-console/supervisor-console.module.code.ts"
import { runInteractive } from "akasha/seat-system/supervising/supervisor-interactive/supervisor-interactive.module.code.ts"
import type { RunInteractiveSeams } from "akasha/seat-system/supervising/supervisor-interactive-seams/supervisor-interactive-seams.module.code.ts"
import { shutdown } from "akasha/seat-system/supervising/supervisor-lifecycle/supervisor-lifecycle.module.code.ts"
import {
  getRestoreConsoleHandle,
  processes,
  setRestoreConsoleHandle,
  setShutdownSinkGetter,
} from "akasha/seat-system/supervising/supervisor-state/supervisor-state.module.code.ts"
import { installSupervisorTerminalGuard } from "akasha/seat-system/supervising/supervisor-terminal/supervisor-terminal.module.code.ts"

async function supervisorMain(seams: RunInteractiveSeams): Promise<void> {
  const agentLog = buildAgentLogRedirect()
  setRestoreConsoleHandle(agentLog.redirectToBootstrap())
  const parsed = parseArgs(process.argv.slice(2))
  assertBootFiles(REQUIRED_BOOT_FILES)

  installSupervisorTerminalGuard({
    shutdown: (signal: string) => shutdown(signal, LIVE_CHILD_EXIT_RULE),
    isClaudeAlive: () => processes.size > 0,
    getSink: agentLog.getCurrentSink,
  })
  setShutdownSinkGetter(agentLog.getCurrentSink)

  console.log(`${LOG} Interactive mode`)
  await runInteractive(parsed.prompt, parsed, agentLog, seams)
  getRestoreConsoleHandle()?.()
  setRestoreConsoleHandle(null)
  await shutdown("interactive-exit", LIVE_CHILD_EXIT_RULE)
}

export function runSupervisor(seams: RunInteractiveSeams): undefined {
  supervisorMain(seams).catch((err: unknown) => {
    try {
      getRestoreConsoleHandle()?.()
    } catch {}
    setRestoreConsoleHandle(null)
    const message = err instanceof Error ? `${err.message}\n${err.stack ?? ""}` : String(err)
    process.stderr.write(`${LOG} Fatal: ${message}\n`)
    console.error(`${LOG} Fatal:`, err)
    process.exit(1)
  })
}
