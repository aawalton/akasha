import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const archersMind = {
  id: "019e6484-5f9d-7b4e-bc32-c17f13b5f242",
  type: "page-type/temper-set",
  slug: "archers-mind",
  title: "Archer's Mind",
  key: "archers-mind",
  esoSetId: 23,
  category: "temper-set-category/arena",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
