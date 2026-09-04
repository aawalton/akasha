import type { SelectProperty } from "@akasha/pages-system/select-property"

export const side = {
  id: "01a06558-36e9-7eab-9e75-8ad48e61258a",
  pageTypeSlug: "select-property",
  slug: "side",
  propertySlug: "side",
  definition: "which side of the body the reading is of",
  values: ["left", "right", "n-a"],
} as const satisfies SelectProperty

export type Side = (typeof side.values)[number]
