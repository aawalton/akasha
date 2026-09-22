import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const recipeName = {
  id: "01a0626e-c112-7021-824e-6c062090140e",
  type: "page-type/text-property",
  slug: "recipe-name",
  propertySlug: "recipe-name",
  definition: "a craftable recipe's name",
  maxLength: 200,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
