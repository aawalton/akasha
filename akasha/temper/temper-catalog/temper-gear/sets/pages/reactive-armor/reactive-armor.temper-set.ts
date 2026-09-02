import type { TemperSet } from "../../temper-set.page-type.ts"

export const reactiveArmor = {
  id: "01a05fdc-9721-7240-b3de-b14222852e7d",
  pageTypeSlug: "temper-set",
  slug: "reactive-armor",
  title: "Reactive Armor",
  key: "reactive-armor",
  esoSetId: 201,
  subcategoryId: "pvp",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
