import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const reactiveArmor = {
  id: "019e66ec-789f-7b65-a19d-34517257f4ef",
  type: "page-type/temper-set",
  slug: "reactive-armor",
  title: "Reactive Armor",
  key: "reactive-armor",
  esoSetId: 201,
  category: "temper-set-category/pvp",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
