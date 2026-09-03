import type { NumberProperty } from "@akasha/pages-system/number-property"

export type WeeklySetFloor = number

export const weeklySetFloor = {
  id: "01a06865-7f46-734e-ac69-7d1c718f0231",
  pageTypeSlug: "number-property",
  slug: "weekly-set-floor",
  propertySlug: "weekly-set-floor",
  definition: "how few sets a week a muscle may take before it is under-worked",
  max: null,
} as const satisfies NumberProperty
