import type { TextProperty } from "@akasha/pages-system/text-property"

export type Themes = string

export const themes = {
  id: "01a06577-f385-7140-a4d9-d83aeb4bbb85",
  pageTypeSlug: "text-property",
  slug: "themes",
  propertySlug: "themes",
  definition: "what a story keeps returning to",
  max: 2000,
  nameFormatSlug: null,
} as const satisfies TextProperty
