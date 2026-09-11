import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const unit = {
  id: "01a05446-e762-7ce0-8bb1-baaa7e20b537",
  type: "text-property",
  slug: "unit",
  propertySlug: "unit",
  definition: "what a reading counts",
  maxLength: 100,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
