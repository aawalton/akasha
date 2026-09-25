import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const seaSerpentsCoil = {
  id: "019e6484-6037-7526-995c-d67f3cf3bc1a",
  type: "page-type/temper-set",
  slug: "sea-serpents-coil",
  title: "Sea-Serpent's Coil",
  key: "sea-serpents-coil",
  esoSetId: 657,
  esoItemIds: [187657],
  esoEquipTypes: ["EQUIP_TYPE_NECK"],
  category: "temper-set-category/mythic",
  valid: ["necklace"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
