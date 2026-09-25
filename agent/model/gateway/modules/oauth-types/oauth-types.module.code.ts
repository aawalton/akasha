export type OAuthCredential = {
  readonly account: string
  readonly accessToken: string
  readonly refreshToken: string
  readonly expiresAt: number
  readonly scopes: readonly string[]
  readonly subscriptionType: string | null
  readonly rateLimitTier: string | null
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
