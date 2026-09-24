import type { buildCredentialSubsystem } from "akasha/agent/claude-code/remote-control/registration-credential/modules/supervisor-credentials/supervisor-credentials.module.code.ts"
import type { ToolRestrictions } from "akasha/agent/modules/tool-access/tool-access.module.code.ts"
import type { AgentIdHandle } from "akasha/agent/seat/supervisor/modules/supervisor-self-identity/supervisor-self-identity.module.code.ts"
import type { resolveClaudeHandoff } from "akasha/agent/seat/supervisor/seat-agent-start/modules/supervisor-adopt/supervisor-adopt.module.code.ts"
import type { RowAgentLaunch } from "akasha/agent/seat/supervisor/seat-agent-start/modules/supervisor-agent-create/supervisor-agent-create.module.code.ts"
import type { buildAgentLogRedirect } from "akasha/agent/seat/supervisor/supervisor-log/modules/supervisor-console/supervisor-console.module.code.ts"
import type { startPerAgentMonitors } from "akasha/agent/seat/supervisor/supervisor-start/modules/supervisor-monitors-wire/supervisor-monitors-wire.module.code.ts"

export type InteractiveOpts = {
  resume: boolean
  account: string
  sessionId?: string
  agentId?: string
  headless: boolean
  exitAfterIterations?: number
  modelOverride?: string
  anthropicBaseUrl?: string
  anthropicAuthToken?: string
}

export type InheritedClaude = ReturnType<typeof resolveClaudeHandoff>

export interface InteractiveBootArgs {
  opts: InteractiveOpts
  agentLog: ReturnType<typeof buildAgentLogRedirect>
  getClaudePid: () => number | null
}

export type CredentialSubsystem = Awaited<ReturnType<typeof buildCredentialSubsystem>>

export interface InteractiveSessionBoot {
  inheritedClaude: InheritedClaude
  processId: string
  selectedAccount: string
  configDir: string
  agentIdHandle: AgentIdHandle
  agentId: string
  sessionId: string
  launch: RowAgentLaunch
  proxy: CredentialSubsystem["proxy"]
  anthropicBaseUrl: string
  stopCredentialWatch: CredentialSubsystem["stopCredentialWatch"]
  credentialRefreshTimer: CredentialSubsystem["credentialRefreshTimer"]
  monitors: ReturnType<typeof startPerAgentMonitors>
  restrictions: ToolRestrictions
  mcpConfigNonce: string
}
