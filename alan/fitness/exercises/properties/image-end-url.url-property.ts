import type { UrlProperty } from "@akasha/pages-system/url-property"

export type ImageEndUrl = string

export const imageEndUrl = {
  id: "01a0657e-2bbf-7034-8609-aae490ca2e57",
  pageTypeSlug: "url-property",
  slug: "image-end-url",
  propertySlug: "image-end-url",
  definition: "a picture of the movement at its finish",
  max: 200,
} as const satisfies UrlProperty
