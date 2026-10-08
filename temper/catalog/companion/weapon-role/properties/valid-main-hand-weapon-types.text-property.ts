import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const validMainHandWeaponTypes = {
  id: "01a05fcd-aed3-794f-9b17-277957dc2758",
  type: "page-type/text-property",
  slug: "valid-main-hand-weapon-types",
  propertySlug: "valid-main-hand-weapon-types",
  definition: "a weapon a pairing takes in the main hand",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
  createdAt: "2026-09-02T01:48:30.291Z",
  updatedAt: "2026-09-21T15:26:51.000Z",
} as const satisfies TextProperty
