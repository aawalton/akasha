import type { ComputedProperty } from "@akasha/pages/computed-property"

export type SleepHours = number

export const sleepHours = {
  id: "01a072ee-1b88-7477-8c90-7b5dc8e4d472",
  pageTypeSlug: "computed-property",
  slug: "sleep-hours",
  propertySlug: "sleep-hours",
  definition: "the hours Alan slept, added up from the day's own stretches",
  holds: "number",
  code: "ts",
} as const satisfies ComputedProperty
