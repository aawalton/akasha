import type { TextProperty } from "@akasha/pages/text-property"

export type SubscriptionType = string

export const subscriptionType = {
  id: "01a054d8-1d39-7f29-a8c5-64ad5c76a3c3",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "subscription-type",
  propertySlug: "subscription-type",
  definition: "the plan the account is subscribed on",
  maxLength: 50,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The subscription type is answered by the upstream probe rather than chosen here.",
    },
  ],
} as const satisfies TextProperty
