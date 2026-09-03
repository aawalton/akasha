import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type IsBallistic = boolean

export const isBallistic = {
  id: "01a0657b-1ad2-794d-8071-3e174f04d9ee",
  pageTypeSlug: "boolean-property",
  slug: "is-ballistic",
  propertySlug: "is-ballistic",
  definition: "whether the movement is thrown rather than driven through its range",
} as const satisfies BooleanProperty
