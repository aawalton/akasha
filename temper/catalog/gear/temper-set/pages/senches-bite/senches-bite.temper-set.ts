import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const senchesBite = {
  id: "019e66e7-6a84-7a17-8997-cd3a95c7f098",
  type: "page-type/temper-set",
  slug: "senches-bite",
  title: "Senche's Bite",
  key: "senches-bite",
  esoSetId: 90,
  category: "temper-set-category/overland",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
