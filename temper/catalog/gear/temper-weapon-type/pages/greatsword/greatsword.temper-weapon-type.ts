import type { TemperWeaponType } from "akasha/temper/catalog/gear/temper-weapon-type/temper-weapon-type.page-type.types.ts"

export const greatsword = {
  id: "019e46b6-408f-7101-8c11-f30ff5b7d117",
  type: "page-type/temper-weapon-type",
  slug: "greatsword",
  title: "Greatsword",
  key: "greatsword",
  enchantmentMultiplier: 1,
  esoWeaponType: "WEAPONTYPE_TWO_HANDED_SWORD",
  isTwoHanded: true,
  weaponPower: 1571,
  validSlots: ["temper-weapon-slot/main-hand"],
  skillLineId: "temper-skill-line/weapon-two-handed",
  hashPlace: 4,
  esoWeaponTypeNumber: 4,
  levelSlope: 16.5,
  levelIntercept: 366.5,
  createdAt: "2026-05-20T18:46:49.743Z",
  updatedAt: "2026-09-27T04:15:45.000Z",
} as const satisfies TemperWeaponType
