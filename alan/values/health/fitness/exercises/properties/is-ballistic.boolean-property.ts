import type { BooleanProperty } from "akasha/pages/boolean-properties/boolean-property.page-type.types.ts"

export type IsBallistic = boolean

export const isBallistic = {
  id: "01a0657e-2bbf-788d-a2d8-02eafb826a19",
  pageTypeSlug: "boolean-property",
  type: "boolean-property",
  slug: "is-ballistic",
  propertySlug: "is-ballistic",
  definition: "whether the movement is thrown rather than driven through its range",
} as const satisfies BooleanProperty
