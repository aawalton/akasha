import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const blackRose = {
  id: "019e66ec-7663-75d5-97ba-12893803d500",
  type: "page-type/temper-set",
  slug: "black-rose",
  title: "Black Rose",
  key: "black-rose",
  esoSetId: 179,
  category: "temper-set-category/pvp",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
