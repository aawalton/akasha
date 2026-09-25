import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const perfectedCrushingWall = {
  id: "019e6484-5fba-7b2f-9cf2-8108665bbf47",
  type: "page-type/temper-set",
  slug: "perfected-crushing-wall",
  title: "Perfected Crushing Wall",
  key: "perfected-crushing-wall",
  esoSetId: 526,
  esoItemIds: [166198, 166199, 166200],
  esoEquipTypes: ["EQUIP_TYPE_TWO_HAND"],
  esoWeaponTypes: ["WEAPONTYPE_FIRE_STAFF", "WEAPONTYPE_FROST_STAFF", "WEAPONTYPE_LIGHTNING_STAFF"],
  category: "temper-set-category/arena",
  valid: ["inferno-staff", "ice-staff", "lightning-staff"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
