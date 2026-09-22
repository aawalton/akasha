import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const sithisTouch = {
  id: "019e66e7-6a8b-7ddc-8cde-e4c5783d7efe",
  type: "page-type/temper-set",
  slug: "sithis-touch",
  title: "Sithis' Touch",
  key: "sithis-touch",
  esoSetId: 245,
  category: "temper-set-category/overland",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
