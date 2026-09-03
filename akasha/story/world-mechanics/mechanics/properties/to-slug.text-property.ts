import type { TextProperty } from "@akasha/pages-system/text-property"

export type ToSlug = string

export const toSlug = {
  id: "01a06558-a991-7784-9188-82a587ffd4bd",
  pageTypeSlug: "text-property",
  slug: "to-slug",
  propertySlug: "to-slug",
  definition: "the mechanic an evolution reached",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
} as const satisfies TextProperty
