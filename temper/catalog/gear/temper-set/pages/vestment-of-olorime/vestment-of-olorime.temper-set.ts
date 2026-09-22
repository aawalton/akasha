import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const vestmentOfOlorime = {
  id: "019e66ec-7edd-7f91-92d7-97ba8d53834e",
  type: "page-type/temper-set",
  slug: "vestment-of-olorime",
  title: "Vestment of Olorime",
  key: "vestment-of-olorime",
  esoSetId: 391,
  category: "temper-set-category/trial",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
