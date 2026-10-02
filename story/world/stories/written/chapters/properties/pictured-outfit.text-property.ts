import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const picturedOutfit = {
  id: "01a0fd84-f745-73b5-8670-9c0af1bbd727",
  type: "page-type/text-property",
  slug: "pictured-outfit",
  propertySlug: "outfit",
  definition: "what the character a chapter's picture shows is wearing, or that she is undressed",
  maxLength: 300,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
