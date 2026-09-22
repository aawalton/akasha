import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const pangritDenmother = {
  id: "019e66e6-a0ad-70f9-8137-ffd6f8e9997d",
  type: "page-type/temper-set",
  slug: "pangrit-denmother",
  title: "Pangrit Denmother",
  key: "pangrit-denmother",
  esoSetId: 663,
  category: "temper-set-category/dungeon",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
