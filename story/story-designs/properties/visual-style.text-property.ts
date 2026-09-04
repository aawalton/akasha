import type { TextProperty } from "@akasha/pages-system/text-property"

export type VisualStyle = string

export const visualStyle = {
  id: "01a06577-f385-7c1c-8e0b-5a8d4ac8821f",
  pageTypeSlug: "text-property",
  slug: "visual-style",
  propertySlug: "visual-style",
  definition: "how a story's pictures are meant to look",
  max: 500,
  nameFormatSlug: null,
} as const satisfies TextProperty
