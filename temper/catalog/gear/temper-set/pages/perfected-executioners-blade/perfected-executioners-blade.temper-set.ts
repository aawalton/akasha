import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const perfectedExecutionersBlade = {
  id: "019e6484-5fbc-76be-9478-521e7cb7b8ce",
  type: "page-type/temper-set",
  slug: "perfected-executioners-blade",
  title: "Perfected Executioner's Blade",
  key: "perfected-executioners-blade",
  esoSetId: 563,
  esoItemIds: [169999, 170000, 170001, 170002],
  esoEquipTypes: ["EQUIP_TYPE_ONE_HAND"],
  esoWeaponTypes: ["WEAPONTYPE_AXE", "WEAPONTYPE_DAGGER", "WEAPONTYPE_HAMMER", "WEAPONTYPE_SWORD"],
  category: "temper-set-category/arena",
  valid: ["sword", "axe", "mace", "dagger"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
