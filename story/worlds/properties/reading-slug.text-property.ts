import type { TextProperty } from "@akasha/pages-system/text-property"

export type ReadingSlug = string

export const readingSlug = {
  id: "01a063ce-6216-7003-82e9-30fd6cf9ebfc",
  pageTypeSlug: "text-property",
  slug: "reading-slug",
  propertySlug: "reading-slug",
  definition: "the name a reading is looked up by",
  max: 100,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A reading slug carries the letters its own text uses rather than Latin alone.",
    },
  ],
} as const satisfies TextProperty
