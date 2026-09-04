import type { Value } from "../value.page-type.ts"

export const love = {
  id: "019eb7d0-f464-7d53-a897-4f98342c82e9",
  pageTypeSlug: "value",
  slug: "love",
  definition: "the people Alan is bound to and how those bonds are kept",
  label: "Love",
  description:
    "Love represents my relationships, with the highest priority being my relationships with myself, my spouse, and my kids.",
  colorSlug: "red",
  place: 2,
  unit: "green day units",
  scaleSlug: "readout-scale/green-day-units",
  groupSlugs: ["readout-group/values"],
  querySlug: "value-green-day-units-on-day",
  queryArgument: "value",
  queryKey: "love",
} as const satisfies Value
