import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const defaultWeaponRoleIds = {
  id: "01a0df69-212e-7789-9085-e889bb56edea",
  type: "page-type/text-property",
  slug: "default-weapon-role-ids",
  propertySlug: "default-weapon-role-ids",
  definition: "a weapon pairing a new build for a role may start with, picked at random",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
} as const satisfies TextProperty
