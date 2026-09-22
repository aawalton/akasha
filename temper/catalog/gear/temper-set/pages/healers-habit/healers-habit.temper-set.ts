import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const healersHabit = {
  id: "019e6484-5fb3-787d-a6b4-5f7260be75df",
  type: "page-type/temper-set",
  slug: "healers-habit",
  title: "Healer's Habit",
  key: "healers-habit",
  esoSetId: 32,
  category: "temper-set-category/arena",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
