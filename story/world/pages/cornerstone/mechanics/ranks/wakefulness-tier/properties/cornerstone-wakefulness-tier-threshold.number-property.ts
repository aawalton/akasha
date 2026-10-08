import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const cornerstoneWakefulnessTierThreshold = {
  id: "01a0dee6-492e-704d-b74a-95898a1a7fd1",
  type: "page-type/number-property",
  slug: "cornerstone-wakefulness-tier-threshold",
  propertySlug: "threshold",
  definition: "the Wakefulness at which the Waking Stone reaches a tier",
  nullable: false,
  max: 28,
  types: "ts",
  createdAt: "2026-09-26T18:07:09.102Z",
  updatedAt: "2026-09-26T18:07:15.000Z",
} as const satisfies NumberProperty
