import type { TextProperty } from "@akasha/pages/text-property"

export type MemoryDistribution = string

export const memoryDistribution = {
  id: "01a06577-f385-7196-a6c2-6db780d204d9",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "memory-distribution",
  propertySlug: "memory-distribution",
  definition: "how what a story remembers is spread across it",
  maxLength: 1000,
  nameFormat: null,
} as const satisfies TextProperty
