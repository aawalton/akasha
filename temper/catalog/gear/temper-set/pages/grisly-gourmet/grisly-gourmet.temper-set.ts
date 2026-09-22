import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const grislyGourmet = {
  id: "019e66e6-a087-7567-98a1-8d730dbbf9d0",
  type: "page-type/temper-set",
  slug: "grisly-gourmet",
  title: "Grisly Gourmet",
  key: "grisly-gourmet",
  esoSetId: 607,
  category: "temper-set-category/dungeon",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
