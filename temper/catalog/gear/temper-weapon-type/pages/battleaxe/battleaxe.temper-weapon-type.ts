import type { TemperWeaponType } from "akasha/temper/catalog/gear/temper-weapon-type/temper-weapon-type.page-type.types.ts"

export const battleaxe = {
  id: "019e46b6-4090-7d4c-a86c-10a0650be267",
  type: "page-type/temper-weapon-type",
  slug: "battleaxe",
  title: "Battle Axe",
  key: "battleaxe",
  enchantmentMultiplier: 1,
  esoWeaponType: "WEAPONTYPE_TWO_HANDED_AXE",
  isTwoHanded: true,
  isTwoHandedMelee: true,
  validSlots: ["temper-weapon-slot/main-hand"],
  skillLineId: "temper-skill-line/weapon-two-handed",
  hashPlace: 1,
  esoWeaponTypeNumber: 5,
  createdAt: "2026-05-20T18:46:49.744Z",
  updatedAt: "2026-10-20T19:44:32.491Z",
} as const satisfies TemperWeaponType
