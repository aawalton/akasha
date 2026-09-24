import {
  configDirForAccount,
  LOG,
} from "akasha/agent/seat/supervisor/supervisor-process/modules/supervisor-config/supervisor-config.module.code.ts"
import {
  execvpe,
  isProcessAlive,
} from "akasha/agent/seat/supervisor/supervisor-process/modules/supervisor-exec/supervisor-exec.module.code.ts"
import {
  getInheritedClaude,
  processes,
} from "akasha/agent/seat/supervisor/supervisor-process/modules/supervisor-state/supervisor-state.module.code.ts"
import { buildHandoffEnv } from "akasha/agent/seat/supervisor-restart/modules/supervisor-handoff-env/supervisor-handoff-env.module.code.ts"
import { getProxyOwnerAgentIdForSelfHeal } from "akasha/agent/seat/supervisor-restart/modules/supervisor-self-heal-state/supervisor-self-heal-state.module.code.ts"

function collectClaudeHandoff(): {
  pid: number
  processId: string
  account: string
  configDir: string
  agentId: string
  sessionId: string
} | null {
  for (const p of processes.values()) {
    if (!p.interactive) continue
    const proc = p.proc
    if (!proc) continue
    if (typeof proc.pid !== "number" || proc.pid <= 0) continue
    return {
      pid: proc.pid,
      processId: p.process_id,
      account: p.currentAccount,
      configDir: p.configDir ?? configDirForAccount(p.currentAccount),
      agentId: p.agent_id,
      sessionId: p.session_id,
    }
  }
  const inherited = getInheritedClaude()
  if (inherited !== null && isProcessAlive(inherited.pid)) {
    console.log(
      `${LOG} adopt: handoff carrying inherited Claude pid=${inherited.pid}, which this supervisor never tracked`
    )
    return {
      pid: inherited.pid,
      processId: inherited.processId,
      account: inherited.account,
      configDir: inherited.configDir,
      agentId: inherited.agentId,
      sessionId: inherited.sessionId,
    }
  }
  return null
}

export function attemptInPlaceReExec(execPath: string, argv: readonly string[]): undefined {
  try {
    const claudeHandoff = collectClaudeHandoff()
    const envp: Record<string, string | undefined> = {
      ...process.env,
      ...buildHandoffEnv({
        claude: claudeHandoff ?? undefined,
        proxyOwnerAgentId: getProxyOwnerAgentIdForSelfHeal() ?? undefined,
      }),
    }
    execvpe(execPath, argv, envp)
  } catch (err) {
    console.error(`${LOG} execvpe re-exec failed, falling back to Bun.spawn:`, err)
  }
}
