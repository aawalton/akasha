import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const name = {
  id: "01a049e7-9b73-7000-af6e-b06a64bcd1c1",
  type: "text-property",
  slug: "name",
  propertySlug: "name",
  definition: "what a directive is called",
  maxLength: 30,
  nameFormat: "name-format/start-case",
  types: "ts",
} as const satisfies TextProperty
