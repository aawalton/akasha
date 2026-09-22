import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const unfathomableDarkness = {
  id: "019e66e7-6aa2-7138-ae0e-1e1ca5e5ae6f",
  type: "page-type/temper-set",
  slug: "unfathomable-darkness",
  title: "Unfathomable Darkness",
  key: "unfathomable-darkness",
  esoSetId: 355,
  category: "temper-set-category/overland",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
