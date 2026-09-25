import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const copyFrom = {
  id: "01a0d984-8902-7d1d-881b-0253c91b52d8",
  type: "page-type/text-property",
  slug: "copy-from",
  propertySlug: "copy-from",
  definition: "the directory inside an image files are copied out of",
  maxLength: 200,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
