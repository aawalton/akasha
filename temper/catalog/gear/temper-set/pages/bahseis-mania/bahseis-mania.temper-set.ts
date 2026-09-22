import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const bahseisMania = {
  id: "019e66ec-7a62-7407-9923-d33394527315",
  type: "page-type/temper-set",
  slug: "bahseis-mania",
  title: "Bahsei's Mania",
  key: "bahseis-mania",
  esoSetId: 587,
  category: "temper-set-category/trial",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
