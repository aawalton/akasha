import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const draugrsRest = {
  id: "019e66e6-a074-7d4b-8901-0f8be5febad0",
  type: "page-type/temper-set",
  slug: "draugrs-rest",
  title: "Draugr's Rest",
  key: "draugrs-rest",
  esoSetId: 335,
  category: "temper-set-category/dungeon",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
