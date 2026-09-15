import type { AccessToken } from "akasha/agent/model/account/properties/access-token.text-property.types.ts"
import type { AccessTokenExpiresAt } from "akasha/agent/model/account/properties/access-token-expires-at.instant-property.types.ts"
import type { AccountUuid } from "akasha/agent/model/account/properties/account-uuid.text-property.types.ts"
import type { AliasIndex } from "akasha/agent/model/account/properties/alias-index.number-property.types.ts"
import type { ApiKey } from "akasha/agent/model/account/properties/api-key.text-property.types.ts"
import type { EffectiveFiveHourResetsAt } from "akasha/agent/model/account/properties/effective-five-hour-resets-at.computed-property.types.ts"
import type { EffectiveFiveHourUsage } from "akasha/agent/model/account/properties/effective-five-hour-usage.computed-property.types.ts"
import type { EffectiveSevenDayUsage } from "akasha/agent/model/account/properties/effective-seven-day-usage.computed-property.types.ts"
import type { Email } from "akasha/agent/model/account/properties/email.email-address-property.types.ts"
import type { FiveHourPercentUsed } from "akasha/agent/model/account/properties/five-hour-percent-used.number-property.types.ts"
import type { FiveHourResetsAt } from "akasha/agent/model/account/properties/five-hour-resets-at.instant-property.types.ts"
import type { FiveHourStartedAt } from "akasha/agent/model/account/properties/five-hour-started-at.instant-property.types.ts"
import type { LastWindowTriggerAt } from "akasha/agent/model/account/properties/last-window-trigger-at.instant-property.types.ts"
import type { Provider } from "akasha/agent/model/account/properties/provider.relation-property.types.ts"
import type { RateLimitTier } from "akasha/agent/model/account/properties/rate-limit-tier.text-property.types.ts"
import type { RefreshToken } from "akasha/agent/model/account/properties/refresh-token.text-property.types.ts"
import type { RenewalDay } from "akasha/agent/model/account/properties/renewal-day.number-property.types.ts"
import type { RescuedCredential } from "akasha/agent/model/account/properties/rescued-credential.record-property.types.ts"
import type { RetryAllowedAt } from "akasha/agent/model/account/properties/retry-allowed-at.instant-property.types.ts"
import type { Scopes } from "akasha/agent/model/account/properties/scopes.text-property.types.ts"
import type { SevenDayPercentUsed } from "akasha/agent/model/account/properties/seven-day-percent-used.number-property.types.ts"
import type { SevenDayResetsAt } from "akasha/agent/model/account/properties/seven-day-resets-at.instant-property.types.ts"
import type { SevenDayStartedAt } from "akasha/agent/model/account/properties/seven-day-started-at.instant-property.types.ts"
import type { SubscriptionDisabledReason } from "akasha/agent/model/account/properties/subscription-disabled-reason.text-property.types.ts"
import type { SubscriptionType } from "akasha/agent/model/account/properties/subscription-type.text-property.types.ts"
import type { TerminalAlertedAt } from "akasha/agent/model/account/properties/terminal-alerted-at.instant-property.types.ts"
import type { TerminalAt } from "akasha/agent/model/account/properties/terminal-at.instant-property.types.ts"
import type { UsageReadAt } from "akasha/agent/model/account/properties/usage-read-at.instant-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"

export type ModelAccount = Page & {
  accountUuid?: AccountUuid
  email: Email
  aliasIndex: AliasIndex
  subscriptionType?: SubscriptionType
  rateLimitTier?: RateLimitTier
  renewalDay?: RenewalDay
  scopes?: Scopes
  accessToken?: AccessToken
  refreshToken?: RefreshToken
  apiKey?: ApiKey
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
  effectiveFiveHourResetsAt?: EffectiveFiveHourResetsAt
  provider: Provider
}
