import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const crimsonTwilight = {
  id: "019e66e6-a06b-7961-88d1-19ac431c478f",
  type: "page-type/temper-set",
  slug: "crimson-twilight",
  title: "Crimson Twilight",
  key: "crimson-twilight",
  esoSetId: 515,
  category: "temper-set-category/dungeon",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
