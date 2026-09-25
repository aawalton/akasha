import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const perfectedRampagingSlash = {
  id: "019e6484-5fc5-7a71-b54f-6c9e3fd26a05",
  type: "page-type/temper-set",
  slug: "perfected-rampaging-slash",
  title: "Perfected Rampaging Slash",
  key: "perfected-rampaging-slash",
  esoSetId: 523,
  esoItemIds: [166186, 166187, 166188, 166189, 166202],
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
