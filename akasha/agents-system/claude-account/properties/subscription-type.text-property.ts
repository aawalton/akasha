import type { TextProperty } from "../../../pages-system/text-property/text-property.page-type.ts"

export type SubscriptionType = string

export const subscriptionType = {
  id: "01a054d8-1d39-7f29-a8c5-64ad5c76a3c3",
  pageTypeSlug: "text-property",
  slug: "subscription-type",
  propertySlug: "subscription-type",
  definition: "the plan the account is subscribed on",
  max: 50,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "This is answered by the upstream probe rather than chosen here.",
    },
  ],
} as const satisfies TextProperty
