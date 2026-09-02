import type { NumberProperty } from "@akasha/pages-system/number-property"

export type ChunkCount = number

export const chunkCount = {
  id: "01a05fcb-fd2d-7dd6-91a7-ef600287f306",
  pageTypeSlug: "number-property",
  slug: "chunk-count",
  propertySlug: "chunk-count",
  definition: "how many files one reading of an inventory was cut into",
  max: null,
} as const satisfies NumberProperty
