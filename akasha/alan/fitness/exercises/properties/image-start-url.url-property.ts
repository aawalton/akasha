import type { UrlProperty } from "@akasha/pages-system/url-property"

export type ImageStartUrl = string

export const imageStartUrl = {
  id: "01a0657b-1ad2-7b0a-8705-47ed0c3ba25f",
  pageTypeSlug: "url-property",
  slug: "image-start-url",
  propertySlug: "image-start-url",
  definition: "a picture of the movement at its start",
  max: 200,
} as const satisfies UrlProperty
