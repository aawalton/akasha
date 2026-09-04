import type { Value } from "../value.page-type.ts"

export const wealth = {
  id: "019eb7d1-032b-73d1-bb88-07b4625d5fb9",
  pageTypeSlug: "value",
  slug: "wealth",
  definition: "Alan's personal sovereignty: the capacity to hold the systems his life runs on",
  label: "Wealth",
  description:
    "Wealth represents my ability to exist independent from the constraints of the world, including freedom of time, freedom of attention, freedom of location, and freedom of action.",
  colorSlug: "orange",
  place: 6,
  unit: "green day units",
  scaleSlug: "readout-scale/green-day-units",
  groupSlugs: ["readout-group/values"],
  querySlug: "value-green-day-units-on-day",
  queryArgument: "value",
  queryKey: "wealth",
} as const satisfies Value
