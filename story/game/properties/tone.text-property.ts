import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const tone = {
  id: "01a0673c-8e0e-7003-b779-4135db93f6ad",
  type: "page-type/text-property",
  slug: "tone",
  propertySlug: "tone",
  definition: "how a game is meant to feel to play",
  maxLength: 500,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
