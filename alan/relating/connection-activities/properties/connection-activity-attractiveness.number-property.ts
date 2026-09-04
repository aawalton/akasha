import type { NumberProperty } from "@akasha/pages-system/number-property"

export type ConnectionActivityAttractiveness = number

export const connectionActivityAttractiveness = {
  id: "01a0658e-c30d-740b-83cb-22cbfd1294eb",
  pageTypeSlug: "number-property",
  slug: "connection-activity-attractiveness",
  propertySlug: "connection-activity-attractiveness",
  definition: "how attractive he finds them",
  max: null,
} as const satisfies NumberProperty
