import type { NumberProperty } from "@akasha/pages-system/number-property"

export type Zone2WeeklyFloor = number

export const zone2WeeklyFloor = {
  id: "01a06865-7f46-7263-a6cd-bc4224f0e6ba",
  pageTypeSlug: "number-property",
  slug: "zone2-weekly-floor",
  propertySlug: "zone2-weekly-floor",
  definition: "how many minutes a week of easy aerobic work Alan is to reach",
  max: null,
} as const satisfies NumberProperty
