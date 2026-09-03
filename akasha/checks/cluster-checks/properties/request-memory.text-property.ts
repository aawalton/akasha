import type { TextProperty } from "@akasha/pages-system/text-property"

export type RequestMemory = string

export const requestMemory = {
  id: "01a0680b-1003-7789-a36e-3ccc3892541b",
  pageTypeSlug: "text-property",
  slug: "request-memory",
  propertySlug: "request-memory",
  definition: "the memory a pod asks for",
  max: 20,
  nameFormatSlug: null,
} as const satisfies TextProperty
