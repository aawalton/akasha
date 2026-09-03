import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type IsBallistic = boolean

export const isBallistic = {
  id: "01a0657e-2bbf-788d-a2d8-02eafb826a19",
  pageTypeSlug: "boolean-property",
  slug: "is-ballistic",
  propertySlug: "is-ballistic",
  definition: "whether the movement is thrown rather than driven through its range",
} as const satisfies BooleanProperty
