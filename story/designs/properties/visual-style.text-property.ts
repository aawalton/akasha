import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type VisualStyle = string

export const visualStyle = {
  id: "01a06577-f385-7c1c-8e0b-5a8d4ac8821f",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "visual-style",
  propertySlug: "visual-style",
  definition: "how a story's pictures are meant to look",
  maxLength: 500,
  nameFormat: null,
} as const satisfies TextProperty
