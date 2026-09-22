import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const indomitableFury = {
  id: "019e66ec-779e-73cf-9e3f-dd2741ed3970",
  type: "page-type/temper-set",
  slug: "indomitable-fury",
  title: "Indomitable Fury",
  key: "indomitable-fury",
  esoSetId: 417,
  category: "temper-set-category/pvp",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
