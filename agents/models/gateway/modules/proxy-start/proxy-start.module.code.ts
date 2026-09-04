import type { RefreshOutcome } from "../../../../claude-accounts/modules/oauth/claude-account-oauth.module.code.ts"
import type { OAuthEffects } from "../oauth-effects/oauth-effects.module.code.ts"

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
}
