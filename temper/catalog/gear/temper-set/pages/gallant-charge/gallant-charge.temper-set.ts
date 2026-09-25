import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const gallantCharge = {
  id: "019e6484-5fb0-787e-b53f-f6e970161ac3",
  type: "page-type/temper-set",
  slug: "gallant-charge",
  title: "Gallant Charge",
  key: "gallant-charge",
  esoSetId: 411,
  esoItemIds: [145011, 145012, 145013, 145014, 145027],
  esoEquipTypes: ["EQUIP_TYPE_OFF_HAND", "EQUIP_TYPE_ONE_HAND"],
  esoWeaponTypes: [
    "WEAPONTYPE_AXE",
    "WEAPONTYPE_DAGGER",
    "WEAPONTYPE_HAMMER",
    "WEAPONTYPE_SHIELD",
    "WEAPONTYPE_SWORD",
  ],
  category: "temper-set-category/arena",
  valid: ["sword", "axe", "mace", "dagger", "shield"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
