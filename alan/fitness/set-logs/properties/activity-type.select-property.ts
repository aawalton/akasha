import type { SelectProperty } from "@akasha/pages-system/select-property"

export const activityType = {
  id: "01a06580-66fd-7f9b-af43-203744c8d848",
  pageTypeSlug: "select-property",
  slug: "activity-type",
  propertySlug: "activity-type",
  definition: "what sort of work the set was, where it is not a loaded lift",
  values: ["cardio", "mobility"],
} as const satisfies SelectProperty

export type ActivityType = (typeof activityType.values)[number]
