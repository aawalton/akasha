import type { NumberProperty } from "@akasha/pages-system/number-property"

export type TotalPoints = number

export const totalPoints = {
  id: "01a05c64-fab0-7000-a792-ace92604f198",
  pageTypeSlug: "number-property",
  slug: "total-points",
  propertySlug: "total-points",
  definition: "the points a persona has earned in all",
  max: null,
} as const satisfies NumberProperty
