import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const syrabanesWard = {
  id: "019e6484-603c-7611-bfcc-c5ef6c87129a",
  type: "page-type/temper-set",
  slug: "syrabanes-ward",
  title: "Syrabane's Ward",
  key: "syrabanes-ward",
  esoSetId: 676,
  esoItemIds: [190888],
  esoArmorTypes: ["ARMORTYPE_HEAVY"],
  esoEquipTypes: ["EQUIP_TYPE_WAIST"],
  category: "temper-set-category/mythic",
  valid: ["waist:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
