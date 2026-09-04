import type { Value } from "../value.page-type.ts"

export const health = {
  id: "019eb7d0-f6ed-73b7-8495-21dfdac80cd2",
  pageTypeSlug: "value",
  slug: "health",
  definition: "the condition of Alan's body and its upkeep",
  label: "Health",
  description:
    "Health represents my care for my physical body, including eat, move, sleep, and hygiene.",
  colorSlug: "blue",
  place: 3,
  unit: "green day units",
  scaleSlug: "readout-scale/green-day-units",
  groupSlugs: ["readout-group/values"],
  querySlug: "value-green-day-units-on-day",
  queryArgument: "value",
  queryKey: "health",
} as const satisfies Value
