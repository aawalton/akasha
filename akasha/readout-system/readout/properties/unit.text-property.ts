import type { TextProperty } from "../../../pages-system/text-property/text-property.page-type.ts"

export type Unit = string

export const unit = {
  id: "01a05446-e762-7ce0-8bb1-baaa7e20b537",
  pageTypeSlug: "text-property",
  slug: "unit",
  propertySlug: "unit",
  definition: "what a reading counts",
  max: 100,
  nameFormatSlug: null,
} as const satisfies TextProperty
