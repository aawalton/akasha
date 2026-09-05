import type { TextProperty } from "@akasha/pages-system/text-property"

export type FromSlug = string

export const fromSlug = {
  id: "01a06558-a991-7b11-b2a3-95ca0eb97a62",
  pageTypeSlug: "text-property",
  slug: "from-slug",
  propertySlug: "from-slug",
  definition: "the mechanic an evolution left",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
} as const satisfies TextProperty
