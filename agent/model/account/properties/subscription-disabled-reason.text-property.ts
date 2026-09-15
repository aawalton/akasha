import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const subscriptionDisabledReason = {
  id: "01a054d8-1d39-7c38-bbf0-00a17589572e",
  type: "page-type/text-property",
  slug: "subscription-disabled-reason",
  propertySlug: "subscription-disabled-reason",
  definition: "what stopped the account's subscription being usable",
  maxLength: 200,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An account stating a subscription disabled reason is passed over by every pass that renews a token.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The account is usable again once this reason is taken away.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
