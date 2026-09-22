import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const lekisFocus = {
  id: "019e66ec-77e9-7c58-a330-b7559ff9d419",
  type: "page-type/temper-set",
  slug: "lekis-focus",
  title: "Leki's Focus",
  key: "lekis-focus",
  esoSetId: 237,
  category: "temper-set-category/pvp",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
