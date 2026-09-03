import type { TextProperty } from "@akasha/pages-system/text-property"

export type LimitMemory = string

export const limitMemory = {
  id: "01a0680b-1003-7f52-9092-a7d8929efa22",
  pageTypeSlug: "text-property",
  slug: "limit-memory",
  propertySlug: "limit-memory",
  definition: "the memory a pod is held to",
  max: 20,
  nameFormatSlug: null,
} as const satisfies TextProperty
