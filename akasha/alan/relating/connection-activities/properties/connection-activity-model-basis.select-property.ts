import type { SelectProperty } from "@akasha/pages-system/select-property"

export const connectionActivityModelBasis = {
  id: "01a0658e-c30e-7f33-9570-3b9eca01266e",
  pageTypeSlug: "select-property",
  slug: "connection-activity-model-basis",
  propertySlug: "connection-activity-model-basis",
  definition: "the calibration the ratings were set against",
  values: ["n32-l6-w05"],
} as const satisfies SelectProperty

export type ConnectionActivityModelBasis = (typeof connectionActivityModelBasis.values)[number]
