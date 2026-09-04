import type { NumberProperty } from "@akasha/pages-system/number-property"

export type DurationSeconds = number

export const durationSeconds = {
  id: "01a06580-66fd-75fc-9405-1f02e059eb3c",
  pageTypeSlug: "number-property",
  slug: "duration-seconds",
  propertySlug: "duration-seconds",
  definition: "how long the set ran, where it is counted in time rather than repetitions",
  max: null,
} as const satisfies NumberProperty
