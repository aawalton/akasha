import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const trueSwornFury = {
  id: "019e66e6-a0dc-724c-b769-a8fc11fb54c3",
  type: "page-type/temper-set",
  slug: "true-sworn-fury",
  title: "True-Sworn Fury",
  key: "true-sworn-fury",
  esoSetId: 569,
  category: "temper-set-category/dungeon",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
