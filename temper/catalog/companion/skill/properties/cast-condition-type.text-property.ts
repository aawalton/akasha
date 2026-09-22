import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const castConditionType = {
  id: "01a06193-6c9e-7d3f-8ec8-33900a372658",
  type: "page-type/text-property",
  slug: "cast-condition-type",
  propertySlug: "type",
  definition: "what a test before a companion casts is a case of",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
} as const satisfies TextProperty
