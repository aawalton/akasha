import type { TextProperty } from "@akasha/pages/text-property"

export type FromSlug = string

export const fromSlug = {
  id: "01a06558-a991-7b11-b2a3-95ca0eb97a62",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "from-slug",
  propertySlug: "from-slug",
  definition: "the mechanic an evolution left",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
} as const satisfies TextProperty
