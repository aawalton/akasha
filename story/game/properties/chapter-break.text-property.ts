import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const chapterBreak = {
  id: "01a0d4e1-a12d-7dcc-9da9-a8637b4b4192",
  type: "page-type/text-property",
  slug: "chapter-break",
  propertySlug: "chapter-break",
  definition: "what ends a chapter of a game's story",
  maxLength: 200,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A game names what ends a chapter, and its game master closes one there.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
