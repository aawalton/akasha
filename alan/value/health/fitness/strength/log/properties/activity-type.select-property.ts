import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const activityType = {
  id: "01a06580-66fd-7f9b-af43-203744c8d848",
  type: "page-type/select-property",
  slug: "activity-type",
  propertySlug: "activity-type",
  definition: "the kind of work in a set where Alan lifts no weight",
  values: ["cardio", "mobility"],
  types: "ts",
  createdAt: "2026-09-03T04:21:48.925Z",
  updatedAt: "2026-10-30T16:44:54.424Z",
} as const satisfies SelectProperty
