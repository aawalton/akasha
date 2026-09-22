import type { TemperCompanionWeaponRole } from "akasha/temper/catalog/companion/weapon-role/temper-companion-weapon-role.page-type.types.ts"

export const noWeaponRole = {
  id: "01a05fcd-ea71-7f28-9148-440317da7854",
  type: "page-type/temper-companion-weapon-role",
  slug: "no-weapon-role",
  key: "no-weapon-role",
  title: "No Weapon Role",
  weaponSkillLineId: "temper-companion-skill-line/no-skill-line",
} as const satisfies TemperCompanionWeaponRole
