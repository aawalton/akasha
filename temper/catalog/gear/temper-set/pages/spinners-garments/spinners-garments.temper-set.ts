import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const spinnersGarments = {
  id: "019e66e7-6a8f-7625-96d2-7cc691284ccc",
  type: "page-type/temper-set",
  slug: "spinners-garments",
  title: "Spinner's Garments",
  key: "spinners-garments",
  esoSetId: 289,
  category: "temper-set-category/overland",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
