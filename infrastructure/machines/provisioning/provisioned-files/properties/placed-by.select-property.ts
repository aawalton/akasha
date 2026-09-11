import type { SelectProperty } from "akasha/pages/select-properties/select-property.page-type.types.ts"

export const placedBy = {
  id: "01a06861-49aa-7937-b453-af9fc3e9cf70",
  type: "select-property",
  slug: "placed-by",
  propertySlug: "placed-by",
  definition: "how the body reaches where it is read",
  values: ["link", "copy", "read-where-it-stands"],
  types: "ts",
} as const satisfies SelectProperty
