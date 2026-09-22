import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const monolithOfStorms = {
  id: "019e6484-5fe3-7102-acad-95bab72dbb1c",
  type: "page-type/temper-set",
  slug: "monolith-of-storms",
  title: "Monolith of Storms",
  key: "monolith-of-storms",
  esoSetId: 727,
  category: "temper-set-category/class-set",
  valid: ["*"],
  classId: "temper-class/sorcerer",
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
