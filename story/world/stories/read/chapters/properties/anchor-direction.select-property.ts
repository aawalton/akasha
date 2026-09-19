import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const anchorDirection = {
  id: "01a0685e-ef8a-7e52-9e45-460c839b0933",
  type: "page-type/select-property",
  slug: "anchor-direction",
  propertySlug: "direction",
  definition: "which way an anchor runs from what it is read against",
  values: ["before", "after", "simultaneous"],
  types: "ts",
} as const satisfies SelectProperty
