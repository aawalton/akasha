import type { TemperWeaponType } from "akasha/temper/catalog/gear/temper-weapon-type/temper-weapon-type.page-type.types.ts"

export const maul = {
  id: "019e46b6-4092-7487-901f-b23ac746b0b1",
  type: "page-type/temper-weapon-type",
  slug: "maul",
  title: "Maul",
  key: "maul",
  enchantmentMultiplier: 1,
  esoWeaponType: "WEAPONTYPE_TWO_HANDED_HAMMER",
  isTwoHanded: true,
  weaponPower: 1571,
  validSlots: ["temper-weapon-slot/main-hand"],
  skillLineId: "temper-skill-line/weapon-two-handed",
  hashPlace: 9,
  esoWeaponTypeNumber: 6,
  levelIntercept: 255,
  createdAt: "2026-05-20T18:46:49.746Z",
  updatedAt: "2026-10-20T19:06:21.443Z",
} as const satisfies TemperWeaponType
