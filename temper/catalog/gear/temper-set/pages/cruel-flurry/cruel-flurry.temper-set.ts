import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const cruelFlurry = {
  id: "019e6484-5fa2-7b0d-ba4d-cfb7621ac350",
  type: "page-type/temper-set",
  slug: "cruel-flurry",
  title: "Cruel Flurry",
  key: "cruel-flurry",
  esoSetId: 371,
  esoItemIds: [71100, 71136, 133630, 133631],
  esoEquipTypes: ["EQUIP_TYPE_ONE_HAND"],
  esoWeaponTypes: ["WEAPONTYPE_AXE", "WEAPONTYPE_DAGGER", "WEAPONTYPE_HAMMER", "WEAPONTYPE_SWORD"],
  category: "temper-set-category/arena",
  valid: ["sword", "axe", "mace", "dagger"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
