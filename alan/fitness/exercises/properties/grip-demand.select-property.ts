import type { SelectProperty } from "@akasha/pages-system/select-property"

export const gripDemand = {
  id: "01a0657e-2bbf-7def-8aa4-63a661a263ff",
  pageTypeSlug: "select-property",
  slug: "grip-demand",
  propertySlug: "grip-demand",
  definition: "how much the movement asks of the hands before the target muscle gives out",
  values: ["high", "low", "none"],
} as const satisfies SelectProperty

export type GripDemand = (typeof gripDemand.values)[number]
