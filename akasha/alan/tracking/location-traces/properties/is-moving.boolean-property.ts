import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type IsMoving = boolean

export const isMoving = {
  id: "01a06935-68b4-7f5d-893a-b0b243026714",
  pageTypeSlug: "boolean-property",
  slug: "is-moving",
  propertySlug: "is-moving",
  definition: "whether the device judged itself in motion",
} as const satisfies BooleanProperty
