import type { NumberProperty } from "@akasha/pages-system/number-property"

export type SourceTotalSnapshot = number

export const sourceTotalSnapshot = {
  id: "01a06551-d6a6-7001-95af-30f1ccd8694c",
  pageTypeSlug: "number-property",
  slug: "source-total-snapshot",
  propertySlug: "source-total-snapshot",
  definition: "the lifetime figure a persona's source stood at when a day was scored",
  max: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A snapshot is the reading taken on the day rather than the reading today.",
    },
  ],
} as const satisfies NumberProperty
