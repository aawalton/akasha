import type { NumberProperty } from "@akasha/pages-system/number-property"

export type HazardsMarked = number

export const hazardsMarked = {
  id: "01a06579-e4f7-741f-a468-31a55899ac37",
  pageTypeSlug: "number-property",
  slug: "hazards-marked",
  propertySlug: "hazards-marked",
  definition: "how many hazards the team has marked",
  max: null,
} as const satisfies NumberProperty
