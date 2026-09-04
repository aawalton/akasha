import type { TextProperty } from "@akasha/pages-system/text-property"

export type Themes = string

export const themes = {
  id: "01a0673c-8e0e-7006-b909-a59e69794770",
  pageTypeSlug: "text-property",
  slug: "themes",
  propertySlug: "themes",
  definition: "what a game keeps returning to, said in a line",
  max: 300,
  nameFormatSlug: null,
} as const satisfies TextProperty
