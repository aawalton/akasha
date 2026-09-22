import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const subtitle = {
  id: "01a05fcf-2467-75a6-9b17-83afd352a723",
  type: "page-type/text-property",
  slug: "subtitle",
  propertySlug: "subtitle",
  definition: "a companion's epithet",
  maxLength: 200,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
