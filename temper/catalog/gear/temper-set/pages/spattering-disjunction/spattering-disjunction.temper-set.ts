import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const spatteringDisjunction = {
  id: "019e6484-5fe8-79a4-818e-81e9de3dfca4",
  type: "page-type/temper-set",
  slug: "spattering-disjunction",
  title: "Spattering Disjunction",
  key: "spattering-disjunction",
  esoSetId: 775,
  category: "temper-set-category/class-set",
  valid: ["*"],
  classId: "temper-class/arcanist",
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
