import type { SelectProperty } from "@akasha/pages-system/select-property"

export const gripDemand = {
  id: "01a0657b-1ad2-7dab-9d31-a88e31108137",
  pageTypeSlug: "select-property",
  slug: "grip-demand",
  propertySlug: "grip-demand",
  definition: "how much the movement asks of the hands before the target muscle gives out",
  values: ["high", "low", "none"],
} as const satisfies SelectProperty

export type GripDemand = (typeof gripDemand.values)[number]
