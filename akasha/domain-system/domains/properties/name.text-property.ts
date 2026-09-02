import type { TextProperty } from "@akasha/pages-system/text-property"

export type Name = string

export const name = {
  id: "01a049e7-9b73-7000-af6e-b06a64bcd1c1",
  pageTypeSlug: "text-property",
  slug: "name",
  propertySlug: "name",
  definition: "what a directive is called",
  max: 30,
  nameFormatSlug: "name-format/start-case",
} as const satisfies TextProperty
