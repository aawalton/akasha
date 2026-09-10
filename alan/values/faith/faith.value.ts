import type { Value } from "../value.page-type.types.ts"

export const faith = {
  id: "019eb7d0-f2ce-7404-ac55-828a43bc73cf",
  pageTypeSlug: "value",
  type: "value",
  slug: "faith",
  definition: "Alan becoming who he is",
  label: "Faith",
  description:
    "Faith represents my developing understanding of myself and my alignment with the identities I have chosen.",
  color: "purple",
  place: 1,
  unit: "green day units",
  scale: "readout-scale/green-day-units",
  groups: ["readout-group/values"],
} as const satisfies Value
