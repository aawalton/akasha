import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const fiordsLegacy = {
  id: "019e66e7-6a5e-7043-9e2c-eefaca335082",
  type: "page-type/temper-set",
  slug: "fiords-legacy",
  title: "Fiord's Legacy",
  key: "fiords-legacy",
  esoSetId: 27,
  category: "temper-set-category/overland",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
