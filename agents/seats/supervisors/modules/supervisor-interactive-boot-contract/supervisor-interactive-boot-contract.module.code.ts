import type { ToolRestrictions } from "akasha/agents/modules/tool-access/tool-access.module.code.ts"
import type { resolveClaudeHandoff } from "akasha/agents/seats/supervisors/modules/supervisor-adopt/supervisor-adopt.module.code.ts"
import type { RowAgentLaunch } from "akasha/agents/seats/supervisors/modules/supervisor-agent-create/supervisor-agent-create.module.code.ts"
import type { buildAgentLogRedirect } from "akasha/agents/seats/supervisors/modules/supervisor-console/supervisor-console.module.code.ts"
import type { startPerAgentMonitors } from "akasha/agents/seats/supervisors/modules/supervisor-monitors-wire/supervisor-monitors-wire.module.code.ts"
import type { AgentIdHandle } from "akasha/agents/seats/supervisors/modules/supervisor-self-identity/supervisor-self-identity.module.code.ts"
import type { ProxyAdoptionRuleSource } from "akasha/seat-system/oauth-proxy/modules/supervisor-proxy-adoption-rule/supervisor-proxy-adoption-rule.module.code.ts"
import type { ProxyLivenessRuleSource } from "akasha/seat-system/oauth-proxy/modules/supervisor-proxy-liveness-rule/supervisor-proxy-liveness-rule.module.code.ts"
import type { buildCredentialSubsystem } from "akasha/seat-system/seat-credential/modules/supervisor-credentials/supervisor-credentials.module.code.ts"

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
  proxyAdoptionRule: ProxyAdoptionRuleSource
  proxyLivenessRule: ProxyLivenessRuleSource
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
