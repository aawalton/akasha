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
  isTwoHandedMelee: true,
  validSlots: ["temper-weapon-slot/main-hand"],
  skillLineId: "temper-skill-line/weapon-two-handed",
  hashPlace: 4,
  esoWeaponTypeNumber: 4,
  createdAt: "2026-05-20T18:46:49.743Z",
  updatedAt: "2026-10-20T19:44:32.491Z",
} as const satisfies TemperWeaponType
