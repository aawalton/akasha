import type { BooleanProperty } from "akasha/pages/boolean-properties/boolean-property.page-type.types.ts"

export const isBallistic = {
  id: "01a0657e-2bbf-788d-a2d8-02eafb826a19",
  type: "boolean-property",
  slug: "is-ballistic",
  propertySlug: "is-ballistic",
  definition: "whether the movement is thrown rather than driven through its range",
  types: "ts",
} as const satisfies BooleanProperty
