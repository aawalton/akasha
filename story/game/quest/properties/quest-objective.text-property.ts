import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const questObjective = {
  id: "01a0c6ac-3660-7a79-af2d-dea83114f216",
  type: "page-type/text-property",
  slug: "quest-objective",
  propertySlug: "objective",
  definition: "what doing a quest takes, in the words the game set it in",
  maxLength: 500,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
