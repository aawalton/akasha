import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const narrator = {
  id: "01a06577-f385-7610-a50c-37a617ccb699",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "narrator",
  propertySlug: "narrator",
  definition: "who tells a story, and from where",
  maxLength: 200,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
