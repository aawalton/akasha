import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type ReadingSlug = string

export const readingSlug = {
  id: "01a063ce-6216-7003-82e9-30fd6cf9ebfc",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "reading-slug",
  propertySlug: "reading-slug",
  definition: "the name a reading is looked up by",
  maxLength: 100,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A reading slug has the letters its own text uses rather than Latin alone.",
    },
  ],
} as const satisfies TextProperty
