import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const perfectedMendersWard = {
  id: "019e6484-5fc0-7a5f-a3f0-07f2f595345c",
  type: "page-type/temper-set",
  slug: "perfected-menders-ward",
  title: "Perfected Mender's Ward",
  key: "perfected-menders-ward",
  esoSetId: 428,
  esoItemIds: [145179],
  esoEquipTypes: ["EQUIP_TYPE_TWO_HAND"],
  esoWeaponTypes: ["WEAPONTYPE_HEALING_STAFF"],
  category: "temper-set-category/arena",
  valid: ["restoration-staff"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
