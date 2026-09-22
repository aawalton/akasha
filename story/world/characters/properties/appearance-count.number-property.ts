import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const appearanceCount = {
  id: "01a0c937-79fb-7f5c-8b05-2b7f000d20ab",
  type: "page-type/number-property",
  slug: "appearance-count",
  propertySlug: "appearance-count",
  definition: "how many chapters of the story say something about a character",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
