import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const subscriptionType = {
  id: "01a054d8-1d39-7f29-a8c5-64ad5c76a3c3",
  type: "page-type/text-property",
  slug: "subscription-type",
  propertySlug: "subscription-type",
  definition: "the name of what Anthropic sells to a model account",
  maxLength: 50,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The subscription type is answered by the upstream probe rather than chosen here.",
    },
  ],
  types: "ts",
  createdAt: "2026-08-30T22:44:04.537Z",
  updatedAt: "2026-09-25T17:54:06.000Z",
} as const satisfies TextProperty
