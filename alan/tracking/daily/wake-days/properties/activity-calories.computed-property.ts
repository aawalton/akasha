import type { ComputedProperty } from "@akasha/pages-system/computed-property"

export type ActivityCalories = number

export const activityCalories = {
  id: "01a07211-0e15-73d9-b8eb-22b8305cff9d",
  pageTypeSlug: "computed-property",
  slug: "activity-calories",
  propertySlug: "activity-calories",
  definition: "the calories the day's cardio and strength came to together",
  holds: "number",
  code: "ts",
} as const satisfies ComputedProperty
