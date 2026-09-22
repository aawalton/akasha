import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const darkstride = {
  id: "019e66e7-6a53-778e-b687-f4f555d7f161",
  type: "page-type/temper-set",
  slug: "darkstride",
  title: "Darkstride",
  key: "darkstride",
  esoSetId: 60,
  category: "temper-set-category/overland",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
