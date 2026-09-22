import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const toothOfLokkestiiz = {
  id: "019e66ec-7ea1-740b-a058-e7bef21bc95c",
  type: "page-type/temper-set",
  slug: "tooth-of-lokkestiiz",
  title: "Tooth of Lokkestiiz",
  key: "tooth-of-lokkestiiz",
  esoSetId: 445,
  category: "temper-set-category/trial",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
