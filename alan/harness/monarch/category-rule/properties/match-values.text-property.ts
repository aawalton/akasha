import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const matchValues = {
  id: "01a0680c-3c00-7002-8e94-3c6a7d1f3103",
  type: "page-type/text-property",
  slug: "match-values",
  propertySlug: "values",
  definition: "the values a category rule looks for",
  maxLength: 200,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A value is written in the words the vocabulary has rather than in a title.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T16:13:47.392Z",
  updatedAt: "2026-10-30T15:45:15.583Z",
} as const satisfies TextProperty
