import { asPid, type Pid } from "../supervisor-exec/supervisor-exec.module.code.ts"

export type SupervisorHandoff = {
  claude: {
    pid: Pid
    processId: string
    account: string
    configDir: string
    agentId: string
    sessionId: string
  } | null
  proxyOwnerAgentId: string | null
}

export const CLAUDE_PID_ENV = "_SUPERVISOR_INHERIT_CLAUDE_PID"
export const CLAUDE_PROCESS_ID_ENV = "_SUPERVISOR_INHERIT_CLAUDE_PROCESS_ID"
export const CLAUDE_ACCOUNT_ENV = "_SUPERVISOR_INHERIT_CLAUDE_ACCOUNT"
export const CLAUDE_CONFIG_DIR_ENV = "_SUPERVISOR_INHERIT_CLAUDE_CONFIG_DIR"
export const CLAUDE_AGENT_ID_ENV = "_SUPERVISOR_INHERIT_CLAUDE_AGENT_ID"
export const CLAUDE_SESSION_ID_ENV = "_SUPERVISOR_INHERIT_CLAUDE_SESSION_ID"

export const PROXY_OWNER_AGENT_ID_ENV = "_SUPERVISOR_INHERIT_OAUTH_PROXY_OWNER_AGENT_ID"

function parseIntInRange(raw: string | undefined, min: number, max: number): number | null {
  if (raw === undefined || raw === "") return null
  if (!/^\d+$/.test(raw)) return null
  const n = Number(raw)
  if (!Number.isFinite(n)) return null
  if (n < min || n > max) return null
  return n
}

export function parseSupervisorHandoffEnv(
  env: Record<string, string | undefined>
): SupervisorHandoff {
  return {
    claude: parseClaudeHandoff(env),
    proxyOwnerAgentId: parseProxyOwnerAgentId(env),
  }
}

function parseProxyOwnerAgentId(env: Record<string, string | undefined>): string | null {
  const raw = env[PROXY_OWNER_AGENT_ID_ENV]
  if (typeof raw !== "string" || raw.length === 0) return null
  return raw
}

export function resolveProxyOwnerAgentId(opts: {
  handoffProxyOwnerAgentId: string | null
  sessionAgentId: string
}): string {
  return opts.handoffProxyOwnerAgentId ?? opts.sessionAgentId
}

function parseClaudeHandoff(env: Record<string, string | undefined>): SupervisorHandoff["claude"] {
  const pidRaw = env[CLAUDE_PID_ENV]
  const processId = env[CLAUDE_PROCESS_ID_ENV]
  const account = env[CLAUDE_ACCOUNT_ENV]
  const configDir = env[CLAUDE_CONFIG_DIR_ENV]
  const agentId = env[CLAUDE_AGENT_ID_ENV]
  const sessionId = env[CLAUDE_SESSION_ID_ENV]
  const allAbsent =
    pidRaw === undefined &&
    processId === undefined &&
    account === undefined &&
    configDir === undefined &&
    agentId === undefined &&
    sessionId === undefined
  if (allAbsent) return null
  const pid = parseIntInRange(pidRaw, 1, 0x7fff_ffff)
  const allStringsPresent =
    typeof processId === "string" &&
    processId.length > 0 &&
    typeof account === "string" &&
    account.length > 0 &&
    typeof configDir === "string" &&
    configDir.length > 0 &&
    typeof agentId === "string" &&
    agentId.length > 0 &&
    typeof sessionId === "string" &&
    sessionId.length > 0
  if (pid === null || !allStringsPresent) {
    console.warn(
      `[supervisor] ignoring malformed re-exec claude handoff env: ` +
        `${CLAUDE_PID_ENV}=${pidRaw ?? "<unset>"} ` +
        `${CLAUDE_PROCESS_ID_ENV}=${processId ?? "<unset>"} ` +
        `${CLAUDE_ACCOUNT_ENV}=${account ?? "<unset>"} ` +
        `${CLAUDE_CONFIG_DIR_ENV}=${configDir ?? "<unset>"} ` +
        `${CLAUDE_AGENT_ID_ENV}=${agentId ?? "<unset>"} ` +
        `${CLAUDE_SESSION_ID_ENV}=${sessionId ?? "<unset>"}`
    )
    return null
  }
  return {
    pid: asPid(pid),
    processId,
    account,
    configDir,
    agentId,
    sessionId,
  }
}

export const SUPERVISOR_HANDOFF_ENV_KEYS = [
  CLAUDE_PID_ENV,
  CLAUDE_PROCESS_ID_ENV,
  CLAUDE_ACCOUNT_ENV,
  CLAUDE_CONFIG_DIR_ENV,
  CLAUDE_AGENT_ID_ENV,
  CLAUDE_SESSION_ID_ENV,
  PROXY_OWNER_AGENT_ID_ENV,
] as const

export function buildHandoffEnv(opts: {
  claude?: {
    pid: number
    processId: string
    account: string
    configDir: string
    agentId: string
    sessionId: string
  }
  proxyOwnerAgentId?: string
}): Record<string, string> {
  const out: Record<string, string> = {}
  if (opts.claude) {
    out[CLAUDE_PID_ENV] = String(opts.claude.pid)
    out[CLAUDE_PROCESS_ID_ENV] = opts.claude.processId
    out[CLAUDE_ACCOUNT_ENV] = opts.claude.account
    out[CLAUDE_CONFIG_DIR_ENV] = opts.claude.configDir
    out[CLAUDE_AGENT_ID_ENV] = opts.claude.agentId
    out[CLAUDE_SESSION_ID_ENV] = opts.claude.sessionId
  }
  if (opts.proxyOwnerAgentId != null && opts.proxyOwnerAgentId.length > 0) {
    out[PROXY_OWNER_AGENT_ID_ENV] = opts.proxyOwnerAgentId
  }
  return out
}
