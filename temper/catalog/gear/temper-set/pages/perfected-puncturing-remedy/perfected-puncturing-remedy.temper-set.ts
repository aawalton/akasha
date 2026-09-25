import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const perfectedPuncturingRemedy = {
  id: "019e6484-5fc3-7dfd-a667-6e2ecf5723f5",
  type: "page-type/temper-set",
  slug: "perfected-puncturing-remedy",
  title: "Perfected Puncturing Remedy",
  key: "perfected-puncturing-remedy",
  esoSetId: 529,
  esoItemIds: [166049, 166050, 166051, 166052, 166065],
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
