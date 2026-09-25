import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const gorethief = {
  id: "01a0d94c-025b-70dc-b685-754b6b11a300",
  type: "page-type/temper-set",
  slug: "gorethief",
  title: "Gorethief",
  key: "gorethief",
  esoSetId: 855,
  category: "temper-set-category/pvp",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
