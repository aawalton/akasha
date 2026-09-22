import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const gryphonsReprisal = {
  id: "019e66e6-a088-76f6-8a79-3a07e066ddac",
  type: "page-type/temper-set",
  slug: "gryphons-reprisal",
  title: "Gryphon's Reprisal",
  key: "gryphons-reprisal",
  esoSetId: 620,
  category: "temper-set-category/dungeon",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
