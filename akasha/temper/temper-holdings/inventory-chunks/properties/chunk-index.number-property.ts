import type { NumberProperty } from "@akasha/pages-system/number-property"

export type ChunkIndex = number

export const chunkIndex = {
  id: "01a05fcb-fd2e-75e2-86fe-92c284b55399",
  pageTypeSlug: "number-property",
  slug: "chunk-index",
  propertySlug: "chunk-index",
  definition: "where a slice falls in the order the slices are rejoined",
  max: null,
} as const satisfies NumberProperty
