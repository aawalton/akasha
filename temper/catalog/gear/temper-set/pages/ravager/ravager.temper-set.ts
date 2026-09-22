import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const ravager = {
  id: "019e66ec-7891-78fa-b0bb-d508898559a5",
  type: "page-type/temper-set",
  slug: "ravager",
  title: "Ravager",
  key: "ravager",
  esoSetId: 108,
  category: "temper-set-category/pvp",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
