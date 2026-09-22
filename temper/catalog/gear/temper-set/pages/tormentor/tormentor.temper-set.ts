import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const tormentor = {
  id: "019e66e6-a0d8-7de3-b3c3-bfa601f6b6b1",
  type: "page-type/temper-set",
  slug: "tormentor",
  title: "Tormentor",
  key: "tormentor",
  esoSetId: 197,
  category: "temper-set-category/dungeon",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
