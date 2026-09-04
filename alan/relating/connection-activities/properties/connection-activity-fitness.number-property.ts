import type { NumberProperty } from "@akasha/pages-system/number-property"

export type ConnectionActivityFitness = number

export const connectionActivityFitness = {
  id: "01a0658e-c30e-7453-bc3a-31fbbe76d6b8",
  pageTypeSlug: "number-property",
  slug: "connection-activity-fitness",
  propertySlug: "connection-activity-fitness",
  definition: "how fit they are",
  max: null,
} as const satisfies NumberProperty
