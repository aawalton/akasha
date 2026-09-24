import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const locationExhausted = {
  id: "01a0c644-4f84-7a9a-afc1-11f456bfa02a",
  type: "page-type/boolean-property",
  slug: "location-exhausted",
  propertySlug: "exhausted",
  definition: "whether a place has nothing left in it for the player to find",
  types: "ts",
} as const satisfies BooleanProperty
