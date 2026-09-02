import type { TextProperty } from "@akasha/pages-system/text-property"

export type Description = string

export const description = {
  id: "01a05fac-7583-7834-bf07-5cbbd0603ee2",
  pageTypeSlug: "text-property",
  slug: "description",
  propertySlug: "description",
  definition: "what a thing is, said for a reader",
  max: 2000,
  nameFormatSlug: null,
} as const satisfies TextProperty
