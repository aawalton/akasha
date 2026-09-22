import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const tzogvinsWarband = {
  id: "019e66e6-a0de-744c-ad91-f1875f3412bf",
  type: "page-type/temper-set",
  slug: "tzogvins-warband",
  title: "Tzogvin's Warband",
  key: "tzogvins-warband",
  esoSetId: 430,
  category: "temper-set-category/dungeon",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
