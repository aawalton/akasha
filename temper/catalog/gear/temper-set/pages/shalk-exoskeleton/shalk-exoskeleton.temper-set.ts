import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const shalkExoskeleton = {
  id: "019e66e7-6a89-77c5-a272-6b270c3899b5",
  type: "page-type/temper-set",
  slug: "shalk-exoskeleton",
  title: "Shalk Exoskeleton",
  key: "shalk-exoskeleton",
  esoSetId: 291,
  category: "temper-set-category/overland",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
