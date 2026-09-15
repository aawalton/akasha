import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const activityType = {
  id: "01a06580-66fd-7f9b-af43-203744c8d848",
  type: "page-type/select-property",
  slug: "activity-type",
  propertySlug: "activity-type",
  definition: "what sort of work the set was, where it is not a loaded lift",
  values: ["cardio", "mobility"],
  types: "ts",
} as const satisfies SelectProperty
