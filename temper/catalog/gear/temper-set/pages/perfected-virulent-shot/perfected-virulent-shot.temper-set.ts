import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const perfectedVirulentShot = {
  id: "019e6484-5fc9-7bae-b7a4-23025606d90a",
  type: "page-type/temper-set",
  slug: "perfected-virulent-shot",
  title: "Perfected Virulent Shot",
  key: "perfected-virulent-shot",
  esoSetId: 426,
  esoItemIds: [145175],
  esoEquipTypes: ["EQUIP_TYPE_TWO_HAND"],
  esoWeaponTypes: ["WEAPONTYPE_BOW"],
  category: "temper-set-category/arena",
  valid: ["bow"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
