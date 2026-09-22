import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const drozakarsClaws = {
  id: "019e66e6-a077-7337-b29f-196bc51a7435",
  type: "page-type/temper-set",
  slug: "drozakars-claws",
  title: "Dro'Zakar's Claws",
  key: "drozakars-claws",
  esoSetId: 453,
  category: "temper-set-category/dungeon",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
