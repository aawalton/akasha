import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const abyssalBrace = {
  id: "019e66e6-a053-73b6-93ec-2671978663d1",
  type: "page-type/temper-set",
  slug: "abyssal-brace",
  title: "Abyssal Brace",
  key: "abyssal-brace",
  esoSetId: 686,
  category: "temper-set-category/dungeon",
  valid: ["*:heavy"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
