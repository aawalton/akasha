import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const noxiousBoulder = {
  id: "019e66e7-6a14-728d-ae1e-cf31fb6aa995",
  type: "page-type/temper-set",
  slug: "noxious-boulder",
  title: "Noxious Boulder",
  key: "noxious-boulder",
  esoSetId: 800,
  category: "temper-set-category/no-type",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
