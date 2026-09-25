import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const slideCloser = {
  id: "01a0d622-64e2-7a72-bfac-db70e1e706bb",
  type: "page-type/text-property",
  slug: "slide-closer",
  propertySlug: "closer",
  definition: "the line a slide ends on",
  maxLength: 400,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
