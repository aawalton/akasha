import type { SelectProperty } from "@akasha/pages-system/select-property"

export const playerColor = {
  id: "01a06582-bd62-7f64-abc7-2bde8817177b",
  pageTypeSlug: "select-property",
  slug: "player-color",
  propertySlug: "player-color",
  definition: "which side Alan played",
  values: ["white", "black"],
} as const satisfies SelectProperty

export type PlayerColor = (typeof playerColor.values)[number]
