import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const perfectedGallantCharge = {
  id: "019e6484-5fbe-7d9b-9c75-e249417f0362",
  type: "page-type/temper-set",
  slug: "perfected-gallant-charge",
  title: "Perfected Gallant Charge",
  key: "perfected-gallant-charge",
  esoSetId: 423,
  esoItemIds: [145164, 145165, 145166, 145167, 145180],
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
