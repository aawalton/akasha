import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const perfectedXorynsMasterpiece = {
  id: "019e66ec-7dd2-71b7-9a26-5ae2bcff1b3e",
  type: "page-type/temper-set",
  slug: "perfected-xoryns-masterpiece",
  title: "Perfected Xoryn's Masterpiece",
  key: "perfected-xoryns-masterpiece",
  esoSetId: 770,
  category: "temper-set-category/trial",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
