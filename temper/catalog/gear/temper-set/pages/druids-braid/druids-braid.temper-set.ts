import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const druidsBraid = {
  id: "019e668e-9a42-7d72-ba1a-b470483e437b",
  type: "page-type/temper-set",
  slug: "druids-braid",
  title: "Druid's Braid",
  key: "druids-braid",
  esoSetId: 642,
  category: "temper-set-category/crafted",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
