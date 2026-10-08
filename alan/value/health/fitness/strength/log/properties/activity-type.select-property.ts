import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const activityType = {
  id: "01a06580-66fd-7f9b-af43-203744c8d848",
  type: "page-type/select-property",
  slug: "activity-type",
  propertySlug: "activity-type",
  definition: "what sort of work the set was, where it is not a loaded lift",
  values: ["cardio", "mobility"],
  types: "ts",
  createdAt: "2026-09-03T04:21:48.925Z",
  updatedAt: "2026-09-15T16:59:44.000Z",
} as const satisfies SelectProperty
