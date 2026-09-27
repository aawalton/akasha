import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const esoWeaponTypeNumber = {
  id: "01a0e0d2-8814-78c5-b98f-e5e53f6ad8a7",
  type: "page-type/number-property",
  slug: "eso-weapon-type-number",
  propertySlug: "eso-weapon-type-number",
  definition: "the number The Elder Scrolls Online gives a kind of weapon",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
