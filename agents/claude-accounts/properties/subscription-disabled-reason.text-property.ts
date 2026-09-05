import type { TextProperty } from "@akasha/pages-system/text-property"

export type SubscriptionDisabledReason = string

export const subscriptionDisabledReason = {
  id: "01a054d8-1d39-7c38-bbf0-00a17589572e",
  pageTypeSlug: "text-property",
  slug: "subscription-disabled-reason",
  propertySlug: "subscription-disabled-reason",
  definition: "what stopped the account's subscription being usable",
  max: 200,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "An account stating a subscription disabled reason is passed over by every pass that renews a token.",
    },
    {
      invariantKind: "departure",
      statement: "The account is usable again once this reason is taken away.",
    },
  ],
} as const satisfies TextProperty
