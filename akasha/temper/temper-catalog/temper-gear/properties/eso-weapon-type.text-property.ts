import type { TextProperty } from "@akasha/pages-system/text-property"

export type EsoWeaponType = string

export const esoWeaponType = {
  id: "01a05fd1-d43b-781e-b83d-8550054c5d2b",
  pageTypeSlug: "text-property",
  slug: "eso-weapon-type",
  propertySlug: "eso-weapon-type",
  definition: "the constant The Elder Scrolls Online names a weapon kind by in its own code",
  max: 200,
  nameFormatSlug: "name-format/upper-snake-case",
} as const satisfies TextProperty
