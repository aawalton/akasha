import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const lunarBastion = {
  id: "019e66ec-7b97-7c6b-ad88-f60f56c5afd0",
  type: "page-type/temper-set",
  slug: "lunar-bastion",
  title: "Lunar Bastion",
  key: "lunar-bastion",
  esoSetId: 231,
  category: "temper-set-category/trial",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
