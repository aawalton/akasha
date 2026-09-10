import type { Page } from "../../pages/page.page-type.types.ts"
import type { AccessToken } from "./properties/access-token.text-property.ts"
import type { AccessTokenExpiresAt } from "./properties/access-token-expires-at.instant-property.ts"
import type { AccountUuid } from "./properties/account-uuid.text-property.ts"
import type { AliasIndex } from "./properties/alias-index.number-property.ts"
import type { EffectiveFiveHourUsage } from "./properties/effective-five-hour-usage.computed-property.ts"
import type { EffectiveSevenDayUsage } from "./properties/effective-seven-day-usage.computed-property.ts"
import type { Email } from "./properties/email.email-address-property.ts"
import type { FiveHourPercentUsed } from "./properties/five-hour-percent-used.number-property.ts"
import type { FiveHourResetsAt } from "./properties/five-hour-resets-at.instant-property.ts"
import type { FiveHourStartedAt } from "./properties/five-hour-started-at.instant-property.ts"
import type { LastWindowTriggerAt } from "./properties/last-window-trigger-at.instant-property.ts"
import type { RateLimitTier } from "./properties/rate-limit-tier.text-property.ts"
import type { RefreshToken } from "./properties/refresh-token.text-property.ts"
import type { RenewalDay } from "./properties/renewal-day.number-property.ts"
import type { RescuedCredential } from "./properties/rescued-credential.record-property.ts"
import type { RetryAllowedAt } from "./properties/retry-allowed-at.instant-property.ts"
import type { Scopes } from "./properties/scopes.text-property.ts"
import type { SevenDayPercentUsed } from "./properties/seven-day-percent-used.number-property.ts"
import type { SevenDayResetsAt } from "./properties/seven-day-resets-at.instant-property.ts"
import type { SevenDayStartedAt } from "./properties/seven-day-started-at.instant-property.ts"
import type { SubscriptionDisabledReason } from "./properties/subscription-disabled-reason.text-property.ts"
import type { SubscriptionType } from "./properties/subscription-type.text-property.ts"
import type { TerminalAlertedAt } from "./properties/terminal-alerted-at.instant-property.ts"
import type { TerminalAt } from "./properties/terminal-at.instant-property.ts"
import type { UsageReadAt } from "./properties/usage-read-at.instant-property.ts"

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
