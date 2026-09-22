import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const banisTorment = {
  id: "019e66e6-a05e-76a6-a77e-5f31ad0360c7",
  type: "page-type/temper-set",
  slug: "banis-torment",
  title: "Bani's Torment",
  key: "banis-torment",
  esoSetId: 473,
  category: "temper-set-category/dungeon",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
