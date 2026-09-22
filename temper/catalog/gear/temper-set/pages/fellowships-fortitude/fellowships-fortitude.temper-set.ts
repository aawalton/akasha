import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const fellowshipsFortitude = {
  id: "019e66e7-6a04-7600-a1ec-dc13b6710115",
  type: "page-type/temper-set",
  slug: "fellowships-fortitude",
  title: "Fellowship's Fortitude",
  key: "fellowships-fortitude",
  esoSetId: 810,
  category: "temper-set-category/no-type",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
