import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const setNameZh = {
  id: "01a0d8e1-0ec0-76b5-aec4-3bca45d80bb1",
  type: "page-type/text-property",
  slug: "set-name-zh",
  propertySlug: "set-name-zh",
  definition: "a set's name in the Chinese client",
  maxLength: 200,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
