export type OAuthCredential = {
  account: string
  accessToken: string
  refreshToken: string
  expiresAt: number
  scopes: readonly string[]
  subscriptionType: string | null
  rateLimitTier: string | null
}

export interface AccountState {
  readonly account: string
  readonly fiveHourUtil: number
  readonly sevenDayUtil: number
  readonly sevenDayResetsAt: string | null
  readonly fiveHourResetsAt: string | null
  readonly subscriptionType: string | null
  readonly subscriptionDisabled: boolean
  readonly fiveHourAtLimitUntil: number | null
  readonly renewalTerminal: boolean
  readonly accessTokenExpiresAt: number | null
}

export type CredentialPick = {
  credential: OAuthCredential
  fiveHourResetsAtMs: number | null
}

export type CredentialDoc = {
  account: string
  accessToken: string
  refreshToken: string
  expiresAt: number
  scopes?: readonly string[]
  subscriptionType?: string | null
  rateLimitTier?: string | null
  subscriptionDisabledAt?: number | null
  subscriptionDisabled?: boolean
  terminalAlertedAt?: number | null
}
