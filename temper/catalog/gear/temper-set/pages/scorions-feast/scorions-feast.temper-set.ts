import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const scorionsFeast = {
  id: "019e66e6-a0bf-70ea-af44-fe1ab7fd0a83",
  type: "page-type/temper-set",
  slug: "scorions-feast",
  title: "Scorion's Feast",
  key: "scorions-feast",
  esoSetId: 603,
  category: "temper-set-category/dungeon",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
