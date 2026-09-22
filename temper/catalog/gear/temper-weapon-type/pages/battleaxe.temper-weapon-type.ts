import type { TemperWeaponType } from "akasha/temper/catalog/gear/temper-weapon-type/temper-weapon-type.page-type.types.ts"

export const battleaxe = {
  id: "019e46b6-4090-7d4c-a86c-10a0650be267",
  type: "page-type/temper-weapon-type",
  slug: "battleaxe",
  title: "Battleaxe",
  key: "battleaxe",
  enchantmentMultiplier: 1,
  esoWeaponType: "WEAPONTYPE_TWO_HANDED_AXE",
  isTwoHanded: true,
  weaponPower: 1571,
  validSlots: ["temper-weapon-slot/main-hand"],
  skillLineId: "weapon-two-handed",
} as const satisfies TemperWeaponType
