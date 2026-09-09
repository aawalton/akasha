import type { Value } from "../value.page-type.ts"

export const health = {
  id: "019eb7d0-f6ed-73b7-8495-21dfdac80cd2",
  pageTypeSlug: "value",
  slug: "health",
  definition: "the condition of Alan's body and its upkeep",
  label: "Health",
  description:
    "Health represents my care for my physical body, including eat, move, sleep, and hygiene.",
  color: "blue",
  place: 3,
  unit: "green day units",
  scale: "readout-scale/green-day-units",
  groups: ["readout-group/values"],
  parts: ["domain/fitness"],
} as const satisfies Value
