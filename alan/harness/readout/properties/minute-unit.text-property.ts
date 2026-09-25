import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const minuteUnit = {
  id: "01a0d966-14f6-77c3-8577-ef2469086542",
  type: "page-type/text-property",
  slug: "minute-unit",
  propertySlug: "minute-unit",
  definition: "what a countdown under an hour counts",
  maxLength: 100,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
