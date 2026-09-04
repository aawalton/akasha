import type { SelectProperty } from "@akasha/pages-system/select-property"

export const connectionActivitySafety = {
  id: "01a0658e-c30e-73bb-985f-a37f0c4401b7",
  pageTypeSlug: "select-property",
  slug: "connection-activity-safety",
  propertySlug: "connection-activity-safety",
  definition: "the safety level he has to be at to get anything from it",
  values: ["L2", "L3", "L4", "L5", "L6"],
} as const satisfies SelectProperty

export type ConnectionActivitySafety = (typeof connectionActivitySafety.values)[number]
