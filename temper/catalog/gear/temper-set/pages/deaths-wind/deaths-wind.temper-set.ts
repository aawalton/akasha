import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const deathsWind = {
  id: "019e668e-9a40-739f-bdb2-5b513c918ffa",
  type: "page-type/temper-set",
  slug: "deaths-wind",
  title: "Death's Wind",
  key: "deaths-wind",
  esoSetId: 37,
  category: "temper-set-category/crafted",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
