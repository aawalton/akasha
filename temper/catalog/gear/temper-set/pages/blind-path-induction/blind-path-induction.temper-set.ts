import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const blindPathInduction = {
  id: "019e66e6-a061-76a6-abd0-5f103991244d",
  type: "page-type/temper-set",
  slug: "blind-path-induction",
  title: "Blind Path Induction",
  key: "blind-path-induction",
  esoSetId: 735,
  category: "temper-set-category/dungeon",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
