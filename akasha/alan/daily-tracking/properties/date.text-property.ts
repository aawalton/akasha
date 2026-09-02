import type { TextProperty } from "@akasha/pages-system/text-property"

export type Date = string

export const date = {
  id: "01a05fd8-c30e-7ae3-b3f5-528afcf00bbe",
  pageTypeSlug: "text-property",
  slug: "date",
  propertySlug: "date",
  definition: "the day a record is of",
  max: 10,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "gap",
      statement: "This property is a day rather than text.",
    },
  ],
} as const satisfies TextProperty
