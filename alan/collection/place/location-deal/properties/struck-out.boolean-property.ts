import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const struckOut = {
  id: "01a06585-5fc5-7b4d-b961-a44cc7d40c8c",
  type: "page-type/boolean-property",
  slug: "struck-out",
  propertySlug: "struck-out",
  definition: "whether the offer is finished",
  types: "ts",
} as const satisfies BooleanProperty
