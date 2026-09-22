import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const perfectedMantleOfSiroria = {
  id: "019e66ec-7cc6-7e88-9866-53bb1738d29c",
  type: "page-type/temper-set",
  slug: "perfected-mantle-of-siroria",
  title: "Perfected Mantle of Siroria",
  key: "perfected-mantle-of-siroria",
  esoSetId: 394,
  category: "temper-set-category/trial",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
