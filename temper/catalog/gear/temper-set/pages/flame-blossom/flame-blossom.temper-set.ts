import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const flameBlossom = {
  id: "019e66e6-a07f-709b-9af6-c7f0d5cc24ed",
  type: "page-type/temper-set",
  slug: "flame-blossom",
  title: "Flame Blossom",
  key: "flame-blossom",
  esoSetId: 338,
  category: "temper-set-category/dungeon",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
