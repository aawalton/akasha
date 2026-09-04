import type { NumberProperty } from "@akasha/pages-system/number-property"

export type ConnectionActivityKindness = number

export const connectionActivityKindness = {
  id: "01a0658e-c30e-7232-b025-8fa280793409",
  pageTypeSlug: "number-property",
  slug: "connection-activity-kindness",
  propertySlug: "connection-activity-kindness",
  definition: "how kind they are to him",
  max: null,
} as const satisfies NumberProperty
