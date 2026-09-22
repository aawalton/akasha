import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const kynesWind = {
  id: "019e66ec-7b7a-77ff-8a6d-c6b341b90716",
  type: "page-type/temper-set",
  slug: "kynes-wind",
  title: "Kyne's Wind",
  key: "kynes-wind",
  esoSetId: 492,
  category: "temper-set-category/trial",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
