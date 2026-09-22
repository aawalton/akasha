import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const venomousSmite = {
  id: "019e66e7-6aa6-703e-b908-00a4e663921d",
  type: "page-type/temper-set",
  slug: "venomous-smite",
  title: "Venomous Smite",
  key: "venomous-smite",
  esoSetId: 488,
  category: "temper-set-category/overland",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
