import type { TextProperty } from "@akasha/pages-system/text-property"

export type HolderSlug = string

export const holderSlug = {
  id: "01a06558-a991-7e56-be1b-8a214695c31a",
  pageTypeSlug: "text-property",
  slug: "holder-slug",
  propertySlug: "holder-slug",
  definition: "the character a naming gives the mechanic to",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
} as const satisfies TextProperty
