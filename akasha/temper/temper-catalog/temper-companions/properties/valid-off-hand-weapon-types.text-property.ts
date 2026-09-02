import type { TextProperty } from "@akasha/pages-system/text-property"

export type ValidOffHandWeaponTypes = string

export const validOffHandWeaponTypes = {
  id: "01a05fcd-aed3-7341-ac9b-0786c5adcd7c",
  pageTypeSlug: "text-property",
  slug: "valid-off-hand-weapon-types",
  propertySlug: "valid-off-hand-weapon-types",
  definition: "a weapon a pairing takes in the off hand",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
} as const satisfies TextProperty
