import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const merchant = {
  id: "01a0680b-2b00-7004-a836-4c9d2b7e2105",
  type: "page-type/text-property",
  slug: "merchant",
  propertySlug: "merchant",
  definition: "the name Monarch gives a Monarch transaction",
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
  createdAt: "2026-09-03T16:12:37.504Z",
  updatedAt: "2026-10-30T15:46:04.353Z",
} as const satisfies TextProperty
