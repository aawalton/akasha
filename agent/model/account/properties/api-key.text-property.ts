import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const apiKey = {
  id: "01a0a21e-187f-7ae6-9485-f180900a5191",
  type: "text-property",
  slug: "api-key",
  propertySlug: "api-key",
  definition: "the key a request to a provider is authorised by",
  maxLength: 200,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
