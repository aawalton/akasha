import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const noSet = {
  id: "019e6459-f96f-7e84-bd52-d3fb388ff0fc",
  type: "page-type/temper-set",
  slug: "no-set",
  title: "No Set",
  key: "no-set",
  esoSetId: 0,
  hashPlace: 0,
  category: "temper-set-category/none",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
