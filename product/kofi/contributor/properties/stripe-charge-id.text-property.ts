import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const stripeChargeId = {
  id: "01a0ba91-c1b5-7a3f-86a1-3c43bcfcbb7c",
  type: "page-type/text-property",
  slug: "stripe-charge-id",
  propertySlug: "stripe-charge-id",
  definition: "the charge Stripe reported that a transaction answers",
  maxLength: 64,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A transaction Stripe did not report states no charge.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A charge already carried by a transaction is not carried a second time.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
