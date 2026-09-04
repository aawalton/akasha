import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { AccountUuid } from "./properties/account-uuid.text-property.ts"
import type { AliasIndex } from "./properties/alias-index.number-property.ts"
import type { Email } from "./properties/email.email-address-property.ts"
import type { RateLimitTier } from "./properties/rate-limit-tier.text-property.ts"
import type { RenewalDay } from "./properties/renewal-day.number-property.ts"
import type { Scopes } from "./properties/scopes.text-property.ts"
import type { SubscriptionType } from "./properties/subscription-type.text-property.ts"

export type ClaudeAccount = Page & {
  accountUuid?: AccountUuid
  email: Email
  aliasIndex: AliasIndex
  subscriptionType?: SubscriptionType
  rateLimitTier?: RateLimitTier
  renewalDay?: RenewalDay
  scopes?: Scopes
}

export const claudeAccount = {
  id: "01a054d8-1d38-788f-a073-7cf3603acd3f",
  pageTypeSlug: "page-type",
  slug: "claude-account",
  definition: "one Anthropic subscription that calls are made on",
  pluralSlug: "claude-accounts",
  extendsSlug: "page-type/page",
  partSlugs: [
    "command/claude-account-add",
    "command/claude-account-re-enable",
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
    "module/claude-account-credential-file",
    "module/claude-account-credential-push",
    "module/claude-account-health",
    "module/claude-account-identity",
    "module/claude-account-making",
    "module/claude-account-marking",
    "module/claude-account-alias-snapshot",
    "module/claude-account-alias-sync",
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
  ],
  properties: [
    { pagePropertySlug: "account-uuid", required: false, many: false },
    { pagePropertySlug: "email", required: true, many: false },
    { pagePropertySlug: "alias-index", required: true, many: false },
    { pagePropertySlug: "subscription-type", required: false, many: false },
    { pagePropertySlug: "rate-limit-tier", required: false, many: false },
    { pagePropertySlug: "renewal-day", required: false, many: false },
    { pagePropertySlug: "scopes", required: false, many: true, max: null },
    { pagePropertySlug: "access-token", required: true, many: false, secret: true },
    { pagePropertySlug: "refresh-token", required: true, many: false, secret: true },
    {
      pagePropertySlug: "access-token-expires-at",
      required: false,
      many: false,
      uncommitted: true,
    },
    {
      pagePropertySlug: "five-hour-percent-used",
      required: false,
      many: false,
      uncommitted: true,
    },
    {
      pagePropertySlug: "seven-day-percent-used",
      required: false,
      many: false,
      uncommitted: true,
    },
    { pagePropertySlug: "five-hour-resets-at", required: false, many: false, uncommitted: true },
    { pagePropertySlug: "seven-day-resets-at", required: false, many: false, uncommitted: true },
    { pagePropertySlug: "five-hour-started-at", required: false, many: false, uncommitted: true },
    { pagePropertySlug: "seven-day-started-at", required: false, many: false, uncommitted: true },
    {
      pagePropertySlug: "last-window-trigger-at",
      required: false,
      many: false,
      uncommitted: true,
    },
    { pagePropertySlug: "retry-allowed-at", required: false, many: false, uncommitted: true },
    { pagePropertySlug: "usage-read-at", required: false, many: false, uncommitted: true },
    {
      pagePropertySlug: "subscription-disabled-reason",
      required: false,
      many: false,
      uncommitted: true,
    },
    { pagePropertySlug: "terminal-at", required: false, many: false, uncommitted: true },
    { pagePropertySlug: "terminal-alerted-at", required: false, many: false, uncommitted: true },
    { pagePropertySlug: "rescued-credential", required: false, many: false, uncommitted: true },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "An account is reached by its slug rather than by the address the account signs in as.",
    },
    {
      invariantKind: "departure",
      statement:
        "An account is made stating the address the account signs in as and the alias the account answers to.",
    },
    {
      invariantKind: "departure",
      statement:
        "The rest of what an account states is answered by the upstream probe at its first sign-in.",
    },
    {
      invariantKind: "departure",
      statement: "What is observed of an account stands beside its page rather than in that page.",
    },
    {
      invariantKind: "departure",
      statement:
        "A declaration saying where a value stands is what routes every mark written here.",
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
