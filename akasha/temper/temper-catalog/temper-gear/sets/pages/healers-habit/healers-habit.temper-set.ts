import type { TemperSet } from "../../temper-set.page-type.ts"

export const healersHabit = {
  id: "01a05fda-f7e5-7121-bfaf-154bef80f447",
  pageTypeSlug: "temper-set",
  slug: "healers-habit",
  title: "Healer's Habit",
  key: "healers-habit",
  esoSetId: 32,
  subcategoryId: "arena",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
