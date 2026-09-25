import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const perfectedVoidBash = {
  id: "019e6484-5fca-7b3d-9513-b27394ffcf96",
  type: "page-type/temper-set",
  slug: "perfected-void-bash",
  title: "Perfected Void Bash",
  key: "perfected-void-bash",
  esoSetId: 564,
  esoItemIds: [169995, 169996, 169997, 169998, 170011],
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
