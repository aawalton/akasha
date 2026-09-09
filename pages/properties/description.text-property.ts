import type { TextProperty } from "@akasha/pages/text-property"

export type Description = string

export const description = {
  id: "01a05fac-7583-7834-bf07-5cbbd0603ee2",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "description",
  propertySlug: "description",
  definition: "what a thing is, said for a reader",
  maxLength: 2000,
  nameFormat: null,
} as const satisfies TextProperty
