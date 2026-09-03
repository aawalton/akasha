import type { UrlProperty } from "@akasha/pages-system/url-property"

export type ImageEndUrl = string

export const imageEndUrl = {
  id: "01a0657b-1ad2-78e7-b22d-8e116ed316d4",
  pageTypeSlug: "url-property",
  slug: "image-end-url",
  propertySlug: "image-end-url",
  definition: "a picture of the movement at its finish",
  max: 200,
} as const satisfies UrlProperty
