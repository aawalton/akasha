import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const perfectedPointBlankSnipe = {
  id: "019e6484-5fc2-7437-8e65-00d7b1fc9656",
  type: "page-type/temper-set",
  slug: "perfected-point-blank-snipe",
  title: "Perfected Point-Blank Snipe",
  key: "perfected-point-blank-snipe",
  esoSetId: 566,
  esoItemIds: [170006],
  esoEquipTypes: ["EQUIP_TYPE_TWO_HAND"],
  esoWeaponTypes: ["WEAPONTYPE_BOW"],
  category: "temper-set-category/arena",
  valid: ["bow"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
