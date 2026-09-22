import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const perfectedKynesWind = {
  id: "019e66ec-7caa-73f0-8785-2a06377318b1",
  type: "page-type/temper-set",
  slug: "perfected-kynes-wind",
  title: "Perfected Kyne's Wind",
  key: "perfected-kynes-wind",
  esoSetId: 493,
  category: "temper-set-category/trial",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
