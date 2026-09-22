import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const bloodMoon = {
  id: "019e66e6-a062-7763-b13b-0d8f86ed4d42",
  type: "page-type/temper-set",
  slug: "blood-moon",
  title: "Blood Moon",
  key: "blood-moon",
  esoSetId: 400,
  category: "temper-set-category/dungeon",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
