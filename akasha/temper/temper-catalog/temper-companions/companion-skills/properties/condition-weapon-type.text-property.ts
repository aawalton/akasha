import type { TextProperty } from "@akasha/pages-system/text-property"

export type ConditionWeaponType = string

export const conditionWeaponType = {
  id: "01a06193-6ca6-70c6-badc-b2d8484b5e22",
  pageTypeSlug: "text-property",
  slug: "condition-weapon-type",
  propertySlug: "weapon-type",
  definition: "the weapon a test holds for",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
} as const satisfies TextProperty
