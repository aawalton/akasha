import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const moonHunter = {
  id: "019e66e6-a0a5-781a-b267-8dbffaacedd9",
  type: "page-type/temper-set",
  slug: "moon-hunter",
  title: "Moon Hunter",
  key: "moon-hunter",
  esoSetId: 402,
  category: "temper-set-category/dungeon",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
