import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const puncturingRemedy = {
  id: "019e6484-5fd0-7d49-9b4a-c7e73beb3341",
  type: "page-type/temper-set",
  slug: "puncturing-remedy",
  title: "Puncturing Remedy",
  key: "puncturing-remedy",
  esoSetId: 314,
  category: "temper-set-category/arena",
  valid: ["sword", "axe", "mace", "dagger", "shield"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
