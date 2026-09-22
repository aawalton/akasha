import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const hollowfangThirst = {
  id: "019e66e6-a091-70c4-a5dc-dd5c5176a646",
  type: "page-type/temper-set",
  slug: "hollowfang-thirst",
  title: "Hollowfang Thirst",
  key: "hollowfang-thirst",
  esoSetId: 452,
  category: "temper-set-category/dungeon",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
