import type { TextProperty } from "@akasha/pages-system/text-property"

export type AltName = string

export const altName = {
  id: "01a05fc4-7a8f-7317-a065-cf6c35fe2012",
  pageTypeSlug: "text-property",
  slug: "alt-name",
  propertySlug: "alt-name",
  definition: "the second name a people is known by",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
