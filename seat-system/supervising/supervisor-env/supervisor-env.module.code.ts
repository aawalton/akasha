const AGENT_LAUNCH_ENV = "AGENT_LAUNCH"

export const AGENT_LAUNCH_SPAWNED = "spawned"

export const AGENT_LAUNCH_OPENED = "opened"

export type RemoteControlEnv = {
  socketPath: string
  oauthToken: string
  scopes: string
  credsFile: string
}

export type SupervisorEnvOpts = {
  baseEnv: Record<string, string | undefined>
  agentId: string
  sessionId: string
  configDir: string
  anthropicBaseUrl?: string
  anthropicAuthToken?: string
  headless: boolean
  remoteControl?: RemoteControlEnv
  supervisorPid?: number
  autoCompactWindow?: string
  effortLevel?: string
  subagentModel?: string
  subagentSpawnDepth: string
  toolTimeout: string
  resumeThresholdMinutes: string
  resumeTokenThreshold: string
}

export function isInheritedClaudeSessionEnvKey(key: string): boolean {
  return key === "CLAUDECODE" || key.startsWith("CLAUDE_CODE_")
}

export function isInheritedAnthropicRoutingEnvKey(key: string): boolean {
  return key === "ANTHROPIC_UNIX_SOCKET" || key === "ANTHROPIC_BASE_URL"
}

export function buildSupervisorEnv(opts: SupervisorEnvOpts): Record<string, string | undefined> {
  const sanitizedBase: Record<string, string | undefined> = {}
  for (const [key, value] of Object.entries(opts.baseEnv)) {
    if (isInheritedClaudeSessionEnvKey(key)) continue
    if (isInheritedAnthropicRoutingEnvKey(key)) continue
    sanitizedBase[key] = value
  }
  const inheritedMcpToolTimeout = opts.baseEnv.MCP_TOOL_TIMEOUT
  const mcpToolTimeout =
    inheritedMcpToolTimeout != null && inheritedMcpToolTimeout !== ""
      ? inheritedMcpToolTimeout
      : opts.toolTimeout
  return {
    ...sanitizedBase,
    CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH: opts.subagentSpawnDepth,
    ...(opts.effortLevel != null ? { CLAUDE_CODE_EFFORT_LEVEL: opts.effortLevel } : {}),
    ...(opts.autoCompactWindow != null
      ? { CLAUDE_CODE_AUTO_COMPACT_WINDOW: opts.autoCompactWindow }
      : {}),
    ...(opts.subagentModel != null ? { CLAUDE_CODE_SUBAGENT_MODEL: opts.subagentModel } : {}),
    MCP_TOOL_TIMEOUT: mcpToolTimeout,
    AGENT_ID: opts.agentId,
    SESSION_ID: opts.sessionId,
    CLAUDE_CONFIG_DIR: opts.configDir,
    ...(opts.supervisorPid !== undefined ? { SUPERVISOR_PID: String(opts.supervisorPid) } : {}),
    [AGENT_LAUNCH_ENV]: opts.headless ? AGENT_LAUNCH_SPAWNED : AGENT_LAUNCH_OPENED,
    ...(opts.headless
      ? {
          CLAUDE_CODE_RESUME_THRESHOLD_MINUTES: opts.resumeThresholdMinutes,
          CLAUDE_CODE_RESUME_TOKEN_THRESHOLD: opts.resumeTokenThreshold,
        }
      : {}),
    ...(opts.anthropicBaseUrl != null ? { ANTHROPIC_BASE_URL: opts.anthropicBaseUrl } : {}),
    ...(opts.anthropicAuthToken != null ? { ANTHROPIC_AUTH_TOKEN: opts.anthropicAuthToken } : {}),
    ...(opts.remoteControl != null
      ? {
          ANTHROPIC_UNIX_SOCKET: opts.remoteControl.socketPath,
          CLAUDE_CODE_OAUTH_TOKEN: opts.remoteControl.oauthToken,
          CLAUDE_CODE_OAUTH_SCOPES: opts.remoteControl.scopes,
          CLAUDE_CODE_HOST_CREDS_FILE: opts.remoteControl.credsFile,
          CLAUDE_CODE_SDK_HAS_HOST_AUTH_REFRESH: "1",
        }
      : {}),
  }
}
