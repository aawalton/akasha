import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const antiquityName = {
  id: "01a06166-503b-7002-add8-4c470a5fd43d",
  type: "page-type/text-property",
  slug: "antiquity-name",
  propertySlug: "antiquity-name",
  definition: "an antiquity's name",
  maxLength: 200,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
