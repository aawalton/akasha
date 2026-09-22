import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const reawakenedHierophant = {
  id: "019e6484-5fe6-715e-9531-3de0eb49dcb8",
  type: "page-type/temper-set",
  slug: "reawakened-hierophant",
  title: "Reawakened Hierophant",
  key: "reawakened-hierophant",
  esoSetId: 722,
  category: "temper-set-category/class-set",
  valid: ["*"],
  classId: "temper-class/arcanist",
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
