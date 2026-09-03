import type { Value } from "../value.page-type.ts"

export const faith = {
  id: "019eb7d0-f2ce-7404-ac55-828a43bc73cf",
  pageTypeSlug: "value",
  slug: "faith",
  definition: "Alan becoming who he is",
  label: "Faith",
  description:
    "Faith represents my developing understanding of myself and my alignment with the identities I have chosen.",
  colorSlug: "purple",
  place: 1,
  unit: "green day units",
  scaleSlug: "readout-scale/green-day-units",
  groupSlugs: ["readout-group/values"],
  querySlug: "value-green-day-units-on-day",
  queryArgument: "value",
  queryKey: "faith",
  totalPoints: 429.3146275,
} as const satisfies Value
