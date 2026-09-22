import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const rangersGait = {
  id: "019e66e7-6a7e-792a-8c2e-b42d51aff518",
  type: "page-type/temper-set",
  slug: "rangers-gait",
  title: "Ranger's Gait",
  key: "rangers-gait",
  esoSetId: 69,
  category: "temper-set-category/overland",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
