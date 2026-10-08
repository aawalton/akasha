import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const chapterBreak = {
  id: "01a0d4e1-a12d-7dcc-9da9-a8637b4b4192",
  type: "page-type/text-property",
  slug: "chapter-break",
  propertySlug: "chapter-break",
  definition: "the rule for where a chapter of a story ends",
  maxLength: 200,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A story names where a chapter ends, and whoever runs the story closes one there.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-24T19:25:51.789Z",
  updatedAt: "2026-09-28T18:03:34.000Z",
} as const satisfies TextProperty
