import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const readingSlug = {
  id: "01a063ce-6216-7003-82e9-30fd6cf9ebfc",
  type: "page-type/text-property",
  slug: "reading-slug",
  propertySlug: "reading-slug",
  definition: "the name by which a reading is looked up",
  maxLength: 100,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading slug has the letters its own text uses rather than Latin alone.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
