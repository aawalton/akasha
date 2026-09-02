import type { TextProperty } from "@akasha/pages-system/text-property"

export type Label = string

export const label = {
  id: "01a05446-e761-77bb-8bfc-c48892a1b249",
  pageTypeSlug: "text-property",
  slug: "label",
  propertySlug: "label",
  definition: "the name a reading is shown under",
  max: 100,
  nameFormatSlug: null,
} as const satisfies TextProperty
