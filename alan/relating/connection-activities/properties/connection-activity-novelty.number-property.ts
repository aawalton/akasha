import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export type ConnectionActivityNovelty = number

export const connectionActivityNovelty = {
  id: "01a0658e-c30e-7769-84a5-fca287f952bc",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "connection-activity-novelty",
  propertySlug: "connection-activity-novelty",
  definition: "how much of it is new to him",
  max: null,
} as const satisfies NumberProperty
