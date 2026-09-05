import type { TextProperty } from "@akasha/pages-system/text-property"

export type Narrator = string

export const narrator = {
  id: "01a06577-f385-7610-a50c-37a617ccb699",
  pageTypeSlug: "text-property",
  slug: "narrator",
  propertySlug: "narrator",
  definition: "who tells a story, and from where",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
