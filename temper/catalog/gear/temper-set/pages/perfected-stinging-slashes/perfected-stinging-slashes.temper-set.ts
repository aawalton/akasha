import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const perfectedStingingSlashes = {
  id: "019e6484-5fc7-748d-b9e4-5f3af01a038b",
  type: "page-type/temper-set",
  slug: "perfected-stinging-slashes",
  title: "Perfected Stinging Slashes",
  key: "perfected-stinging-slashes",
  esoSetId: 530,
  esoItemIds: [166053, 166054, 166055, 166056],
  esoEquipTypes: ["EQUIP_TYPE_ONE_HAND"],
  esoWeaponTypes: ["WEAPONTYPE_AXE", "WEAPONTYPE_DAGGER", "WEAPONTYPE_HAMMER", "WEAPONTYPE_SWORD"],
  category: "temper-set-category/arena",
  valid: ["sword", "axe", "mace", "dagger"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
