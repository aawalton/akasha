import type { Value } from "../value.page-type.types.ts"

export const learn = {
  id: "019eb7d1-0072-7909-a9a7-6fa76806f067",
  pageTypeSlug: "value",
  type: "value",
  slug: "learn",
  definition: "the understanding Alan builds",
  label: "Learn",
  description:
    "Learn represents my progress towards understanding truth in all domains of knowledge.",
  color: "green",
  place: 4,
  unit: "green day units",
  scale: "readout-scale/green-day-units",
  groups: ["readout-group/values"],
} as const satisfies Value
