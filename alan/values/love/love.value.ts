import type { Value } from "../value.page-type.types.ts"

export const love = {
  id: "019eb7d0-f464-7d53-a897-4f98342c82e9",
  pageTypeSlug: "value",
  type: "value",
  slug: "love",
  definition: "the people Alan is bound to and how those bonds are kept",
  label: "Love",
  description:
    "Love represents my relationships, with the highest priority being my relationships with myself, my spouse, and my kids.",
  color: "red",
  place: 2,
  unit: "green day units",
  scale: "readout-scale/green-day-units",
  groups: ["readout-group/values"],
} as const satisfies Value
