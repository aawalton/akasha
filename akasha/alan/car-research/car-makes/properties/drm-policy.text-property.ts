import type { TextProperty } from "@akasha/pages-system/text-property"

export type DrmPolicy = string

export const drmPolicy = {
  id: "01a0659b-cde9-719e-a998-be6788ae2475",
  pageTypeSlug: "text-property",
  slug: "drm-policy",
  propertySlug: "drm-policy",
  definition: "what the make locks behind its own software",
  max: 5000,
  nameFormatSlug: null,
} as const satisfies TextProperty
