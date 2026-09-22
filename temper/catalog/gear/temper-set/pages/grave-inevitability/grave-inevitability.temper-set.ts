import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const graveInevitability = {
  id: "019e66e6-a086-7470-a8c2-382fb76395f1",
  type: "page-type/temper-set",
  slug: "grave-inevitability",
  title: "Grave Inevitability",
  key: "grave-inevitability",
  esoSetId: 664,
  category: "temper-set-category/dungeon",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
