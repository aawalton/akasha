import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const keyText = {
  id: "01a05fcf-246a-7159-98cc-c6c0ba7abf32",
  type: "page-type/text-property",
  slug: "key-text",
  propertySlug: "key-text",
  definition: "the game's spelling of a constant",
  maxLength: 100,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
