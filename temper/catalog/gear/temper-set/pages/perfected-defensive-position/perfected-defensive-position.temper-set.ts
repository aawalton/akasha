import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const perfectedDefensivePosition = {
  id: "019e66ec-7c71-774f-8b8e-b2f5d8f0c9e2",
  type: "page-type/temper-set",
  slug: "perfected-defensive-position",
  title: "Perfected Defensive Position",
  key: "perfected-defensive-position",
  esoSetId: 358,
  esoItemIds: [133243, 133244, 133245, 133246, 133259],
  esoEquipTypes: ["EQUIP_TYPE_OFF_HAND", "EQUIP_TYPE_ONE_HAND"],
  esoWeaponTypes: [
    "WEAPONTYPE_AXE",
    "WEAPONTYPE_DAGGER",
    "WEAPONTYPE_HAMMER",
    "WEAPONTYPE_SHIELD",
    "WEAPONTYPE_SWORD",
  ],
  category: "temper-set-category/trial",
  valid: ["sword", "axe", "mace", "dagger", "shield"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
