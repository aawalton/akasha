import type { Value } from "../value.page-type.types.ts"

export const wealth = {
  id: "019eb7d1-032b-73d1-bb88-07b4625d5fb9",
  pageTypeSlug: "value",
  type: "value",
  slug: "wealth",
  definition: "Alan's personal sovereignty: the capacity to hold the systems his life runs on",
  label: "Wealth",
  description:
    "Wealth represents my ability to exist independent from the constraints of the world, including freedom of time, freedom of attention, freedom of location, and freedom of action.",
  color: "orange",
  place: 6,
  unit: "green day units",
  scale: "readout-scale/green-day-units",
  groups: ["readout-group/values"],
} as const satisfies Value
