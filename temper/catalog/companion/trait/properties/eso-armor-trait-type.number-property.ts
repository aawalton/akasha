import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const esoArmorTraitType = {
  id: "01a0deca-8f2c-7a92-bbdd-323589cf4348",
  type: "page-type/number-property",
  slug: "eso-armor-trait-type",
  propertySlug: "eso-armor-trait-type",
  definition: "the number the game gives a companion trait worked into armor",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
