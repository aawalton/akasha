import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const tavasFavor = {
  id: "019e668e-9a69-7bb9-bb95-82450fde090f",
  type: "page-type/temper-set",
  slug: "tavas-favor",
  title: "Tava's Favor",
  key: "tavas-favor",
  esoSetId: 224,
  category: "temper-set-category/crafted",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
