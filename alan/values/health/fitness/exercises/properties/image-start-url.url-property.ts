import type { UrlProperty } from "@akasha/pages/url-property"

export type ImageStartUrl = string

export const imageStartUrl = {
  id: "01a0657e-2bbf-7c1e-a193-0af8283b27cf",
  pageTypeSlug: "url-property",
  type: "url-property",
  slug: "image-start-url",
  propertySlug: "image-start-url",
  definition: "a picture of the movement at its start",
  maxLength: 200,
} as const satisfies UrlProperty
