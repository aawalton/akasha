import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const talfygsTreachery = {
  id: "019e66e6-a0d0-757f-b6cd-f6c5c33a91f9",
  type: "page-type/temper-set",
  slug: "talfygs-treachery",
  title: "Talfyg's Treachery",
  key: "talfygs-treachery",
  esoSetId: 513,
  category: "temper-set-category/dungeon",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
