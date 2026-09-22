import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const darkConvergence = {
  id: "019e66ec-76d0-7617-9cc6-1e8555e0cb36",
  type: "page-type/temper-set",
  slug: "dark-convergence",
  title: "Dark Convergence",
  key: "dark-convergence",
  esoSetId: 616,
  category: "temper-set-category/pvp",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
