import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const merchantPatterns = {
  id: "01a0680c-3c00-700a-8e26-5b3d7f4a310b",
  type: "page-type/text-property",
  slug: "merchant-patterns",
  propertySlug: "merchant-patterns",
  definition: "the words that show the Monarch merchant of a Monarch transaction",
  maxLength: 200,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A pattern is copied from the bank's line exactly including its abbreviations.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pattern matches where the bank's line has that pattern anywhere.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T16:13:47.392Z",
  updatedAt: "2026-10-30T15:32:51.491Z",
} as const satisfies TextProperty
