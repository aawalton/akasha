import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type DrmPolicy = string

export const drmPolicy = {
  id: "01a0659e-e27d-7584-b388-217e54a89d2b",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "drm-policy",
  propertySlug: "drm-policy",
  definition: "what the make locks behind its own software",
  maxLength: 5000,
  nameFormat: null,
} as const satisfies TextProperty
