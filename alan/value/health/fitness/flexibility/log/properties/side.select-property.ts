import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const side = {
  id: "01a06558-36e9-7eab-9e75-8ad48e61258a",
  type: "page-type/select-property",
  slug: "side",
  propertySlug: "side",
  definition: "the reading's side of the body",
  values: ["left", "right", "n-a"],
  types: "ts",
} as const satisfies SelectProperty
