import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const voidBash = {
  id: "019e6484-5fd9-706e-b092-fb9b92bcf419",
  type: "page-type/temper-set",
  slug: "void-bash",
  title: "Void Bash",
  key: "void-bash",
  esoSetId: 558,
  esoItemIds: [169876, 169877, 169878, 169879, 169892],
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
