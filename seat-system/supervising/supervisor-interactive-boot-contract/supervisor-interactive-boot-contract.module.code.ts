import type { resolveClaudeHandoff } from "@akasha/seat-system/supervisor-adopt"
import type { RowAgentLaunch } from "@akasha/seat-system/supervisor-agent-create"
import type { buildAgentLogRedirect } from "@akasha/seat-system/supervisor-console"
import type { startPerAgentMonitors } from "@akasha/seat-system/supervisor-monitors-wire"
import type { AgentIdHandle } from "@akasha/seat-system/supervisor-self-identity"
import type { ProxyAdoptionRuleSource } from "../../oauth-proxy/supervisor-proxy-adoption-rule/supervisor-proxy-adoption-rule.module.code.ts"
import type { ProxyLivenessRuleSource } from "../../oauth-proxy/supervisor-proxy-liveness-rule/supervisor-proxy-liveness-rule.module.code.ts"
import type { buildCredentialSubsystem } from "../../seat-credential/supervisor-credentials/supervisor-credentials.module.code.ts"
import type { ToolRestrictions } from "../../tool-access/tool-access.module.code.ts"

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
