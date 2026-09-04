import type { NumberProperty } from "@akasha/pages-system/number-property"

export type SleepPoints = number

export const sleepPoints = {
  id: "01a05fd8-c30f-73f0-a384-6ae806f54d2c",
  pageTypeSlug: "number-property",
  slug: "sleep-points",
  propertySlug: "sleep-points",
  definition: "the minutes Alan slept on a day",
  max: null,
} as const satisfies NumberProperty
