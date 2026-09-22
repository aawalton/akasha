import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const galerionsRevenge = {
  id: "019e66ec-7744-7a9b-8473-140f8152bab2",
  type: "page-type/temper-set",
  slug: "galerions-revenge",
  title: "Galerion's Revenge",
  key: "galerions-revenge",
  esoSetId: 246,
  category: "temper-set-category/pvp",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
