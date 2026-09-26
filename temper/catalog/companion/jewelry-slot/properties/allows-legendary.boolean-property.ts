import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const allowsLegendary = {
  id: "01a0df56-32b2-7ac1-9349-70e661e87cf8",
  type: "page-type/boolean-property",
  slug: "allows-legendary",
  propertySlug: "allows-legendary",
  definition: "whether a companion may wear legendary quality in a place",
  types: "ts",
} as const satisfies BooleanProperty
