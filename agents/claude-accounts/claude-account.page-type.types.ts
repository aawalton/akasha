import type { AccessToken } from "akasha/agents/claude-accounts/properties/access-token.text-property.types.ts"
import type { AccessTokenExpiresAt } from "akasha/agents/claude-accounts/properties/access-token-expires-at.instant-property.types.ts"
import type { AccountUuid } from "akasha/agents/claude-accounts/properties/account-uuid.text-property.types.ts"
import type { AliasIndex } from "akasha/agents/claude-accounts/properties/alias-index.number-property.types.ts"
import type { EffectiveFiveHourUsage } from "akasha/agents/claude-accounts/properties/effective-five-hour-usage.computed-property.types.ts"
import type { EffectiveSevenDayUsage } from "akasha/agents/claude-accounts/properties/effective-seven-day-usage.computed-property.types.ts"
import type { Email } from "akasha/agents/claude-accounts/properties/email.email-address-property.types.ts"
import type { FiveHourPercentUsed } from "akasha/agents/claude-accounts/properties/five-hour-percent-used.number-property.types.ts"
import type { FiveHourResetsAt } from "akasha/agents/claude-accounts/properties/five-hour-resets-at.instant-property.types.ts"
import type { FiveHourStartedAt } from "akasha/agents/claude-accounts/properties/five-hour-started-at.instant-property.types.ts"
import type { LastWindowTriggerAt } from "akasha/agents/claude-accounts/properties/last-window-trigger-at.instant-property.types.ts"
import type { RateLimitTier } from "akasha/agents/claude-accounts/properties/rate-limit-tier.text-property.types.ts"
import type { RefreshToken } from "akasha/agents/claude-accounts/properties/refresh-token.text-property.types.ts"
import type { RenewalDay } from "akasha/agents/claude-accounts/properties/renewal-day.number-property.types.ts"
import type { RescuedCredential } from "akasha/agents/claude-accounts/properties/rescued-credential.record-property.ts"
import type { RetryAllowedAt } from "akasha/agents/claude-accounts/properties/retry-allowed-at.instant-property.types.ts"
import type { Scopes } from "akasha/agents/claude-accounts/properties/scopes.text-property.types.ts"
import type { SevenDayPercentUsed } from "akasha/agents/claude-accounts/properties/seven-day-percent-used.number-property.types.ts"
import type { SevenDayResetsAt } from "akasha/agents/claude-accounts/properties/seven-day-resets-at.instant-property.types.ts"
import type { SevenDayStartedAt } from "akasha/agents/claude-accounts/properties/seven-day-started-at.instant-property.types.ts"
import type { SubscriptionDisabledReason } from "akasha/agents/claude-accounts/properties/subscription-disabled-reason.text-property.types.ts"
import type { SubscriptionType } from "akasha/agents/claude-accounts/properties/subscription-type.text-property.types.ts"
import type { TerminalAlertedAt } from "akasha/agents/claude-accounts/properties/terminal-alerted-at.instant-property.types.ts"
import type { TerminalAt } from "akasha/agents/claude-accounts/properties/terminal-at.instant-property.types.ts"
import type { UsageReadAt } from "akasha/agents/claude-accounts/properties/usage-read-at.instant-property.types.ts"
import type { Page } from "akasha/pages/page.page-type.types.ts"

export type ClaudeAccount = Page & {
  accountUuid?: AccountUuid
  email: Email
  aliasIndex: AliasIndex
  subscriptionType?: SubscriptionType
  rateLimitTier?: RateLimitTier
  renewalDay?: RenewalDay
  scopes?: Scopes
  accessToken?: AccessToken
  refreshToken?: RefreshToken
  accessTokenExpiresAt?: AccessTokenExpiresAt
  fiveHourPercentUsed?: FiveHourPercentUsed
  sevenDayPercentUsed?: SevenDayPercentUsed
  fiveHourResetsAt?: FiveHourResetsAt
  sevenDayResetsAt?: SevenDayResetsAt
  fiveHourStartedAt?: FiveHourStartedAt
  sevenDayStartedAt?: SevenDayStartedAt
  lastWindowTriggerAt?: LastWindowTriggerAt
  retryAllowedAt?: RetryAllowedAt
  usageReadAt?: UsageReadAt
  subscriptionDisabledReason?: SubscriptionDisabledReason
  terminalAt?: TerminalAt
  terminalAlertedAt?: TerminalAlertedAt
  rescuedCredential?: RescuedCredential
  effectiveFiveHourUsage?: EffectiveFiveHourUsage
  effectiveSevenDayUsage?: EffectiveSevenDayUsage
}
