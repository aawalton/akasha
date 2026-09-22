import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const pyrebrand = {
  id: "019e6484-5fe5-721d-860a-1fb9c62aa22f",
  type: "page-type/temper-set",
  slug: "pyrebrand",
  title: "Pyrebrand",
  key: "pyrebrand",
  esoSetId: 776,
  subcategoryId: "class",
  valid: ["*"],
  classId: "temper-class/dragonknight",
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
