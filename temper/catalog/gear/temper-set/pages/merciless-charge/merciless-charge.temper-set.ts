import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const mercilessCharge = {
  id: "019e6484-5fb7-736c-b2cf-dd661947d615",
  type: "page-type/temper-set",
  slug: "merciless-charge",
  title: "Merciless Charge",
  key: "merciless-charge",
  esoSetId: 369,
  esoItemIds: [71118, 71124, 71130],
  esoEquipTypes: ["EQUIP_TYPE_TWO_HAND"],
  esoWeaponTypes: [
    "WEAPONTYPE_TWO_HANDED_AXE",
    "WEAPONTYPE_TWO_HANDED_HAMMER",
    "WEAPONTYPE_TWO_HANDED_SWORD",
  ],
  category: "temper-set-category/arena",
  valid: ["greatsword", "battleaxe", "maul"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
