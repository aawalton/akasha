import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const meritoriousService = {
  id: "019e66ec-781c-7454-a957-34438d8a0ec3",
  type: "page-type/temper-set",
  slug: "meritorious-service",
  title: "Meritorious Service",
  key: "meritorious-service",
  esoSetId: 181,
  category: "temper-set-category/pvp",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
