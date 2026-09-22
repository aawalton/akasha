import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const perfectedPuncturingRemedy = {
  id: "019e6484-5fc3-7dfd-a667-6e2ecf5723f5",
  type: "page-type/temper-set",
  slug: "perfected-puncturing-remedy",
  title: "Perfected Puncturing Remedy",
  key: "perfected-puncturing-remedy",
  esoSetId: 529,
  category: "temper-set-category/arena",
  valid: ["sword", "axe", "mace", "dagger", "shield"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
