import type { TextProperty } from "@akasha/pages-system/text-property"

export type DrmPolicy = string

export const drmPolicy = {
  id: "01a06598-aa80-70f6-b31c-686a9933bcd5",
  pageTypeSlug: "text-property",
  slug: "drmPolicy",
  propertySlug: "drmPolicy",
  definition: "what the make locks behind its own software",
  max: 5000,
  nameFormatSlug: null,
} as const satisfies TextProperty
