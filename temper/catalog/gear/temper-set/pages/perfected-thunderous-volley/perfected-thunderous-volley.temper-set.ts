import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const perfectedThunderousVolley = {
  id: "019e6484-5fc8-7183-bd1c-84cd19a95bb8",
  type: "page-type/temper-set",
  slug: "perfected-thunderous-volley",
  title: "Perfected Thunderous Volley",
  key: "perfected-thunderous-volley",
  esoSetId: 525,
  esoItemIds: [166197],
  esoEquipTypes: ["EQUIP_TYPE_TWO_HAND"],
  esoWeaponTypes: ["WEAPONTYPE_BOW"],
  category: "temper-set-category/arena",
  valid: ["bow"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
