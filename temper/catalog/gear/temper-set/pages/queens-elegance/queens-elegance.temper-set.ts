import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const queensElegance = {
  id: "019e66e7-6a7c-73db-8337-befb6e97d0b7",
  type: "page-type/temper-set",
  slug: "queens-elegance",
  title: "Queen's Elegance",
  key: "queens-elegance",
  esoSetId: 86,
  category: "temper-set-category/overland",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
