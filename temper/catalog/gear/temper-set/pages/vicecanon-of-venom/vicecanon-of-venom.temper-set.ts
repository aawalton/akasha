import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const vicecanonOfVenom = {
  id: "019e66ec-79c1-7ba3-aaea-cc3b891d7534",
  type: "page-type/temper-set",
  slug: "vicecanon-of-venom",
  title: "Vicecanon of Venom",
  key: "vicecanon-of-venom",
  esoSetId: 247,
  category: "temper-set-category/pvp",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
