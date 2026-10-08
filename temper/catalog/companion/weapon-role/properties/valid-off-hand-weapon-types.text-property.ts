import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const validOffHandWeaponTypes = {
  id: "01a05fcd-aed3-7341-ac9b-0786c5adcd7c",
  type: "page-type/text-property",
  slug: "valid-off-hand-weapon-types",
  propertySlug: "valid-off-hand-weapon-types",
  definition: "a weapon a pairing takes in the off hand",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
  createdAt: "2026-09-02T01:48:30.291Z",
  updatedAt: "2026-09-21T15:26:51.000Z",
} as const satisfies TextProperty
