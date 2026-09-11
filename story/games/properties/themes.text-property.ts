import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const themes = {
  id: "01a0673c-8e0e-7006-b909-a59e69794770",
  type: "text-property",
  slug: "themes",
  propertySlug: "themes",
  definition: "what a game keeps returning to, said in a line",
  maxLength: 300,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
