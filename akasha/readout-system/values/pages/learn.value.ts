import type { Value } from "../value.page-type.ts"

export const learn = {
  id: "019eb7d1-0072-7909-a9a7-6fa76806f067",
  pageTypeSlug: "value",
  slug: "learn",
  definition: "the understanding Alan builds",
  label: "Learn",
  description:
    "Learn represents my progress towards understanding truth in all domains of knowledge.",
  colorSlug: "green",
  place: 4,
  unit: "green day units",
  scaleSlug: "readout-scale/green-day-units",
  groupSlugs: ["readout-group/values"],
  querySlug: "value-green-day-units-on-day",
  queryArgument: "value",
  queryKey: "learn",
  totalPoints: 41.3633,
} as const satisfies Value
