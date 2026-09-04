import type { SelectProperty } from "@akasha/pages-system/select-property"

export const placedBy = {
  id: "01a06861-49aa-7937-b453-af9fc3e9cf70",
  pageTypeSlug: "select-property",
  slug: "placed-by",
  propertySlug: "placed-by",
  definition: "how the body reaches where it is read",
  values: ["link", "copy", "read-where-it-stands"],
} as const satisfies SelectProperty

export type PlacedBy = (typeof placedBy.values)[number]
