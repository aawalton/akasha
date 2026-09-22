import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const phoenix = {
  id: "019e66ec-785d-740d-a4d5-46584fdd03cb",
  type: "page-type/temper-set",
  slug: "phoenix",
  title: "Phoenix",
  key: "phoenix",
  esoSetId: 200,
  category: "temper-set-category/pvp",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
