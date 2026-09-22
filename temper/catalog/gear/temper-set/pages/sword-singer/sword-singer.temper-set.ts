import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const swordSinger = {
  id: "019e66e7-6a97-7d21-9698-6f99a08a58fb",
  type: "page-type/temper-set",
  slug: "sword-singer",
  title: "Sword-Singer",
  key: "sword-singer",
  esoSetId: 283,
  category: "temper-set-category/overland",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
