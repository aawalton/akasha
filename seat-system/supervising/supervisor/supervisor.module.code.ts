import { shutdown } from "@akasha/seat-system/supervisor-lifecycle"
import {
  getRestoreConsoleHandle,
  processes,
  setRestoreConsoleHandle,
  setShutdownSinkGetter,
} from "@akasha/seat-system/supervisor-state"
import { installSupervisorTerminalGuard } from "@akasha/seat-system/supervisor-terminal"
import { parseArgs } from "../supervisor-args/supervisor-args.module.code.ts"
import { liveChildExitRule } from "../supervisor-child-exit-rule/supervisor-child-exit-rule.module.code.ts"
import {
  assertBootFiles,
  LOG,
  REQUIRED_BOOT_FILES,
} from "../supervisor-config/supervisor-config.module.code.ts"
import { buildAgentLogRedirect } from "../supervisor-console/supervisor-console.module.code.ts"
import { runInteractive } from "../supervisor-interactive/supervisor-interactive.module.code.ts"
import type { RunInteractiveSeams } from "../supervisor-interactive-seams/supervisor-interactive-seams.module.code.ts"

export async function supervisorMain(seams: RunInteractiveSeams): Promise<void> {
  const agentLog = buildAgentLogRedirect()
  setRestoreConsoleHandle(agentLog.redirectToBootstrap())
  const parsed = parseArgs(process.argv.slice(2))
  assertBootFiles(REQUIRED_BOOT_FILES)

  installSupervisorTerminalGuard({
    shutdown: (signal: string) => shutdown(signal, liveChildExitRule),
    isClaudeAlive: () => processes.size > 0,
    getSink: agentLog.getCurrentSink,
  })
  setShutdownSinkGetter(agentLog.getCurrentSink)

  console.log(`${LOG} Interactive mode`)
  await runInteractive(parsed.prompt, parsed, agentLog, seams)
  getRestoreConsoleHandle()?.()
  setRestoreConsoleHandle(null)
  await shutdown("interactive-exit", liveChildExitRule)
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
