import type { NumberProperty } from "@akasha/pages-system/number-property"

export type SourcePoints = number

export const sourcePoints = {
  id: "01a06551-d6a6-7000-8016-d546d4c12ca0",
  pageTypeSlug: "number-property",
  slug: "source-points",
  propertySlug: "source-points",
  definition: "the points a persona's source earned her on a day",
  max: null,
} as const satisfies NumberProperty
