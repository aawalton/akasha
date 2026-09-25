import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const pearlsOfEhlnofey = {
  id: "019e6484-6033-7903-b357-f7c7ebebb72a",
  type: "page-type/temper-set",
  slug: "pearls-of-ehlnofey",
  title: "Pearls of Ehlnofey",
  key: "pearls-of-ehlnofey",
  esoSetId: 576,
  esoItemIds: [171437],
  esoEquipTypes: ["EQUIP_TYPE_NECK"],
  category: "temper-set-category/mythic",
  valid: ["necklace"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
