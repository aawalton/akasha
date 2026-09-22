import type { TemperCompanionWeaponRole } from "akasha/temper/catalog/companion/weapon-role/temper-companion-weapon-role.page-type.types.ts"

export const twoHanded = {
  id: "01a05fcd-ea72-7afa-bd37-52049414a82e",
  type: "page-type/temper-companion-weapon-role",
  slug: "two-handed",
  key: "two-handed",
  title: "Two Handed",
  weaponSkillLineId: "temper-companion-skill-line/weapon-two-handed",
  validMainHandWeaponTypes: ["greatsword", "battleaxe", "maul"],
} as const satisfies TemperCompanionWeaponRole
