import type { TextProperty } from "@akasha/pages-system/text-property"

export type MemoryDistribution = string

export const memoryDistribution = {
  id: "01a06577-f385-7196-a6c2-6db780d204d9",
  pageTypeSlug: "text-property",
  slug: "memory-distribution",
  propertySlug: "memory-distribution",
  definition: "how what a story remembers is spread across it",
  max: 1000,
  nameFormatSlug: null,
} as const satisfies TextProperty
