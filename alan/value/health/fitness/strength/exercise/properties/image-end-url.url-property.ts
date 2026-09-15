import type { UrlProperty } from "akasha/page/url-property/url-property.page-type.types.ts"

export const imageEndUrl = {
  id: "01a0657e-2bbf-7034-8609-aae490ca2e57",
  type: "page-type/url-property",
  slug: "image-end-url",
  propertySlug: "image-end-url",
  definition: "a picture of the movement at its finish",
  maxLength: 200,
  types: "ts",
} as const satisfies UrlProperty
