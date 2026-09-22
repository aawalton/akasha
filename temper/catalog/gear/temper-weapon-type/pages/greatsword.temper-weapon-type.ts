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
  skillLineId: "weapon-two-handed",
} as const satisfies TemperWeaponType
