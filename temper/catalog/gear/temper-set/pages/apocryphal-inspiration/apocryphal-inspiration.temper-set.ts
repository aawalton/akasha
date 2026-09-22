import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const apocryphalInspiration = {
  id: "019e66e6-a057-77b8-b338-4eaa9ecc1e8d",
  type: "page-type/temper-set",
  slug: "apocryphal-inspiration",
  title: "Apocryphal Inspiration",
  key: "apocryphal-inspiration",
  esoSetId: 685,
  category: "temper-set-category/dungeon",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
