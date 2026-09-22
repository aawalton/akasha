import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const nocturnalsPloy = {
  id: "019e66ec-7842-7eb0-8c9f-e0ae172502f9",
  type: "page-type/temper-set",
  slug: "nocturnals-ploy",
  title: "Nocturnal's Ploy",
  key: "nocturnals-ploy",
  esoSetId: 669,
  category: "temper-set-category/pvp",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
