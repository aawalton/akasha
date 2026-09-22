import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const stygian = {
  id: "019e66e7-6a95-7683-8a17-c166ab2edb58",
  type: "page-type/temper-set",
  slug: "stygian",
  title: "Stygian",
  key: "stygian",
  esoSetId: 68,
  category: "temper-set-category/overland",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
