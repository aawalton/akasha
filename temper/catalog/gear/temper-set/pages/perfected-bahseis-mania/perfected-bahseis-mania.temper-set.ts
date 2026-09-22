import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const perfectedBahseisMania = {
  id: "019e66ec-7c2a-7458-bf85-a92d972c42b0",
  type: "page-type/temper-set",
  slug: "perfected-bahseis-mania",
  title: "Perfected Bahsei's Mania",
  key: "perfected-bahseis-mania",
  esoSetId: 591,
  category: "temper-set-category/trial",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
