import type { TextProperty } from "@akasha/pages-system/text-property"

export type DrmPolicy = string

export const drmPolicy = {
  id: "01a0659e-e27d-7584-b388-217e54a89d2b",
  pageTypeSlug: "text-property",
  slug: "drm-policy",
  propertySlug: "drm-policy",
  definition: "what the make locks behind its own software",
  max: 5000,
  nameFormatSlug: null,
} as const satisfies TextProperty
