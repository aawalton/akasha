import type { RefreshOutcome } from "akasha/agent/model/account/modules/oauth/model-account-oauth.module.code.ts"
import type { OAuthEffects } from "akasha/agent/model/gateway/modules/oauth-effects/oauth-effects.module.code.ts"
import type { FallbackRead } from "akasha/agent/model/gateway/modules/provider-upstream/provider-upstream.module.code.ts"
import type { HeldSubagents } from "akasha/agent/model/gateway/modules/subagent-stop-refusal/subagent-stop-refusal.module.code.ts"

export type OAuthProxy = {
  readonly port: number
  readonly stop: () => undefined
  readonly flushAll: (reason: string) => undefined
}

export type StartOAuthProxyOptions = {
  readonly port: number
  readonly root: string
  readonly logPrefix?: string
  readonly onRefreshOutcome?: (account: string, outcome: RefreshOutcome) => undefined
  readonly isAccountTerminal?: (account: string) => boolean
  readonly getLogDir?: () => string
  readonly upstreamIdleTimeoutMs?: number
  readonly downstreamKeepaliveMs?: number
  readonly unixSocketPath?: string
  readonly oauth?: OAuthEffects
  readonly fallback?: FallbackRead
  readonly stopped?: HeldSubagents | undefined
}
