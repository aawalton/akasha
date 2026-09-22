import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const essenceThief = {
  id: "019e66e6-a07d-7e58-ba79-df1401bddf04",
  type: "page-type/temper-set",
  slug: "essence-thief",
  title: "Essence Thief",
  key: "essence-thief",
  esoSetId: 198,
  category: "temper-set-category/dungeon",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
