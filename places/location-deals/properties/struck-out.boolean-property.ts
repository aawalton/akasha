import type { BooleanProperty } from "akasha/pages/boolean-properties/boolean-property.page-type.types.ts"

export type StruckOut = boolean

export const struckOut = {
  id: "01a06585-5fc5-7b4d-b961-a44cc7d40c8c",
  pageTypeSlug: "boolean-property",
  type: "boolean-property",
  slug: "struck-out",
  propertySlug: "struck-out",
  definition: "whether the offer is done with",
} as const satisfies BooleanProperty
