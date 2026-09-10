import type { PageType } from "@akasha/pages/page-type"
import type { Page } from "akasha/pages/page.page-type.types.ts"
import type { AccessToken } from "./properties/access-token.text-property.ts"
import type { AccessTokenExpiresAt } from "./properties/access-token-expires-at.instant-property.ts"
import type { AccountUuid } from "./properties/account-uuid.text-property.ts"
import type { AliasIndex } from "./properties/alias-index.number-property.ts"
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
}

export const claudeAccount = {
  id: "01a054d8-1d38-788f-a073-7cf3603acd3f",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "claude-account",
  definition: "one Anthropic subscription that calls are made on",
  pluralSlug: "claude-accounts",
  extends: ["page-type/page"],
  parts: [
    "computed-property/effective-five-hour-usage",
    "computed-property/effective-seven-day-usage",
    "email-address-property/email",
    "instant-property/access-token-expires-at",
    "instant-property/five-hour-resets-at",
    "instant-property/five-hour-started-at",
    "instant-property/last-window-trigger-at",
    "instant-property/retry-allowed-at",
    "instant-property/seven-day-resets-at",
    "instant-property/seven-day-started-at",
    "instant-property/terminal-alerted-at",
    "instant-property/terminal-at",
    "instant-property/usage-read-at",
    "module/account-upkeep-running",
    "module/account-upkeep-stall-reading",
    "module/claude-account-credential-file",
    "module/claude-account-credential-push",
    "module/claude-account-health",
    "module/claude-account-identity",
    "module/claude-account-making",
    "module/claude-account-marking",
    "module/claude-account-measuring",
    "module/claude-account-oauth",
    "module/claude-account-pacing",
    "module/claude-account-usage",
    "module/claude-account-reading",
    "module/claude-account-refreshing",
    "module/claude-account-renewing",
    "module/claude-account-selection",
    "module/claude-account-upkeep",
    "module/claude-account-upkeep-stall",
    "number-property/alias-index",
    "number-property/five-hour-percent-used",
    "number-property/renewal-day",
    "number-property/rescued-expires-at-ms",
    "number-property/seven-day-percent-used",
    "record-property/rescued-credential",
    "text-property/access-token",
    "text-property/account-uuid",
    "text-property/rate-limit-tier",
    "text-property/refresh-token",
    "text-property/rescued-access-token",
    "text-property/rescued-refresh-token",
    "text-property/scopes",
    "text-property/subscription-disabled-reason",
    "text-property/subscription-type",
    "workstation-service/claude-account-upkeep-service",
    "workstation-service/claude-account-upkeep-stall",
  ],
  properties: [
    { pageProperty: "text-property/account-uuid", required: false, many: false },
    { pageProperty: "email-address-property/email", required: true, many: false },
    { pageProperty: "number-property/alias-index", required: true, many: false },
    { pageProperty: "text-property/subscription-type", required: false, many: false },
    { pageProperty: "text-property/rate-limit-tier", required: false, many: false },
    { pageProperty: "number-property/renewal-day", required: false, many: false },
    { pageProperty: "text-property/scopes", required: false, many: true, maxCount: null },
    { pageProperty: "text-property/access-token", required: true, many: false, secret: true },
    { pageProperty: "text-property/refresh-token", required: true, many: false, secret: true },
    {
      pageProperty: "instant-property/access-token-expires-at",
      required: false,
      many: false,
      uncommitted: true,
    },
    {
      pageProperty: "number-property/five-hour-percent-used",
      required: false,
      many: false,
      uncommitted: true,
    },
    {
      pageProperty: "number-property/seven-day-percent-used",
      required: false,
      many: false,
      uncommitted: true,
    },
    {
      pageProperty: "instant-property/five-hour-resets-at",
      required: false,
      many: false,
      uncommitted: true,
    },
    {
      pageProperty: "instant-property/seven-day-resets-at",
      required: false,
      many: false,
      uncommitted: true,
    },
    {
      pageProperty: "instant-property/five-hour-started-at",
      required: false,
      many: false,
      uncommitted: true,
    },
    {
      pageProperty: "instant-property/seven-day-started-at",
      required: false,
      many: false,
      uncommitted: true,
    },
    {
      pageProperty: "instant-property/last-window-trigger-at",
      required: false,
      many: false,
      uncommitted: true,
    },
    {
      pageProperty: "instant-property/retry-allowed-at",
      required: false,
      many: false,
      uncommitted: true,
    },
    {
      pageProperty: "instant-property/usage-read-at",
      required: false,
      many: false,
      uncommitted: true,
    },
    {
      pageProperty: "text-property/subscription-disabled-reason",
      required: false,
      many: false,
      uncommitted: true,
    },
    {
      pageProperty: "instant-property/terminal-at",
      required: false,
      many: false,
      uncommitted: true,
    },
    {
      pageProperty: "instant-property/terminal-alerted-at",
      required: false,
      many: false,
      uncommitted: true,
    },
    {
      pageProperty: "record-property/rescued-credential",
      required: false,
      many: false,
      uncommitted: true,
    },
    {
      pageProperty: "computed-property/effective-five-hour-usage",
      required: false,
      many: false,
    },
    {
      pageProperty: "computed-property/effective-seven-day-usage",
      required: false,
      many: false,
    },
  ],
  worked: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "An account is reached by its slug rather than by the address the account signs in as.",
    },
    {
      invariantKind: "departure",
      statement: "The claude-account page type is reached by its id rather than by a spelled slug.",
    },
    {
      invariantKind: "departure",
      statement:
        "An account is made stating the address the account signs in as and the alias the account answers to.",
    },
    {
      invariantKind: "departure",
      statement:
        "The rest of the values an account states is answered by the upstream probe at its first sign-in.",
    },
    {
      invariantKind: "departure",
      statement: "The marks observed of an account sit beside its page rather than in that page.",
    },
    {
      invariantKind: "departure",
      statement: "A declaration saying where a value sits routes every mark written here.",
    },
    {
      invariantKind: "departure",
      statement: "A mark whose key this page type does not declare is refused rather than written.",
    },
    {
      invariantKind: "departure",
      statement: "Every account holds the whole fleet's work in turn.",
    },
    {
      invariantKind: "absence",
      statement: "No account is any persona's own.",
    },
  ],
} as const satisfies PageType
