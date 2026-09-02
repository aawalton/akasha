import type { TextProperty } from "@akasha/pages-system/text-property"

export type ValidWeaponRoleIds = string

export const validWeaponRoleIds = {
  id: "01a05fce-1853-73f0-8008-1c06e61a3a04",
  pageTypeSlug: "text-property",
  slug: "valid-weapon-role-ids",
  propertySlug: "valid-weapon-role-ids",
  definition: "a weapon pairing a role is built around",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
} as const satisfies TextProperty
