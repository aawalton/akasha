import type { NumberProperty } from "@akasha/pages-system/number-property"

export type CellsCleared = number

export const cellsCleared = {
  id: "01a06579-e4f7-7ee2-af56-1d72f43785de",
  pageTypeSlug: "number-property",
  slug: "cells-cleared",
  propertySlug: "cells-cleared",
  definition: "how many cells the team has cleared",
  max: null,
} as const satisfies NumberProperty
