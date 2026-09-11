import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export const sleepPoints = {
  id: "01a05fd8-c30f-73f0-a384-6ae806f54d2c",
  type: "number-property",
  slug: "sleep-points",
  propertySlug: "sleep-points",
  definition: "the minutes Alan slept on a day",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
