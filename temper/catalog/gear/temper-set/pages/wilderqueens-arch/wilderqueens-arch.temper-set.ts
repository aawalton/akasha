import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const wilderqueensArch = {
  id: "019e66e7-6ab1-76ce-863f-964ef7a17e53",
  type: "page-type/temper-set",
  slug: "wilderqueens-arch",
  title: "Wilderqueen's Arch",
  key: "wilderqueens-arch",
  esoSetId: 106,
  category: "temper-set-category/overland",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
