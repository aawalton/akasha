import type { TextProperty } from "@akasha/pages/text-property"

export type Unit = string

export const unit = {
  id: "01a05446-e762-7ce0-8bb1-baaa7e20b537",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "unit",
  propertySlug: "unit",
  definition: "what a reading counts",
  maxLength: 100,
  nameFormat: null,
} as const satisfies TextProperty
