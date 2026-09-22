import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const camonnaTong = {
  id: "019e66e7-6a4f-7e4e-92ca-abb3e812dd9c",
  type: "page-type/temper-set",
  slug: "camonna-tong",
  title: "Camonna Tong",
  key: "camonna-tong",
  esoSetId: 699,
  category: "temper-set-category/overland",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
