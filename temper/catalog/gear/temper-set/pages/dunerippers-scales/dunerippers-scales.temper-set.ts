import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const dunerippersScales = {
  id: "019e66e6-a078-7614-8ac7-fde4e77c603f",
  type: "page-type/temper-set",
  slug: "dunerippers-scales",
  title: "Duneripper's Scales",
  key: "dunerippers-scales",
  esoSetId: 102,
  category: "temper-set-category/dungeon",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
