import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const soulcleaver = {
  id: "019e6484-5fe7-76bd-ab8e-51aacf69d0cd",
  type: "page-type/temper-set",
  slug: "soulcleaver",
  title: "Soulcleaver",
  key: "soulcleaver",
  esoSetId: 726,
  category: "temper-set-category/class-set",
  valid: ["*"],
  classId: "temper-class/nightblade",
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
