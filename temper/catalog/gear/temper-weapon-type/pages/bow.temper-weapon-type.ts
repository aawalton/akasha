import type { TemperWeaponType } from "akasha/temper/catalog/gear/temper-weapon-type/temper-weapon-type.page-type.types.ts"

export const bow = {
  id: "019e46b6-4093-7b67-baf3-46ba92124202",
  type: "page-type/temper-weapon-type",
  slug: "bow",
  title: "Bow",
  key: "bow",
  enchantmentMultiplier: 1,
  esoWeaponType: "WEAPONTYPE_BOW",
  isTwoHanded: true,
  weaponPower: 1335,
  validSlots: ["temper-weapon-slot/main-hand"],
  skillLineId: "temper-skill-line/weapon-bow",
} as const satisfies TemperWeaponType
