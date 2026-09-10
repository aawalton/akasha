import type { BooleanProperty } from "akasha/pages/boolean-properties/boolean-property.page-type.types.ts"

export const isMoving = {
  id: "01a06935-68b4-7f5d-893a-b0b243026714",
  pageTypeSlug: "boolean-property",
  type: "boolean-property",
  slug: "is-moving",
  propertySlug: "is-moving",
  definition: "whether the device judged itself in motion",
  types: "ts",
} as const satisfies BooleanProperty
