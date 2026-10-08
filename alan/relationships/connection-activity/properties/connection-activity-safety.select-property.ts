import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const connectionActivitySafety = {
  id: "01a0658e-c30e-73bb-985f-a37f0c4401b7",
  type: "page-type/select-property",
  slug: "connection-activity-safety",
  propertySlug: "connection-activity-safety",
  definition: "the safety level he has to be at to get anything from it",
  values: ["L2", "L3", "L4", "L5", "L6"],
  types: "ts",
  createdAt: "2026-09-03T04:37:29.998Z",
  updatedAt: "2026-09-25T13:01:00.000Z",
} as const satisfies SelectProperty
