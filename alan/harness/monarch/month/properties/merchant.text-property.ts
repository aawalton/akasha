import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const merchant = {
  id: "01a0680b-2b00-7004-a836-4c9d2b7e2105",
  type: "page-type/text-property",
  slug: "merchant",
  propertySlug: "merchant",
  definition: "a transaction's other party",
  maxLength: 200,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A merchant is Monarch's title for the row rather than the bank's own words.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "How the money moved is a merchant where the row's words name no vendor.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
