import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theBattleOfOrsinium = {
  id: "01a0d5f6-d68b-71b1-840a-71b11259c657",
  type: "page-type/temper-lore-book",
  slug: "the-battle-of-orsinium",
  title: "The Battle of Orsinium",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 3198,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
