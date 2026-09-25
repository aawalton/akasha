import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theBattleOfTheAle = {
  id: "01a0d5f6-1c16-7709-825f-b3899e3f351c",
  type: "page-type/temper-lore-book",
  slug: "the-battle-of-the-ale",
  title: "The Battle of the Ale",
  collection: "temper-lore-collection/words-of-the-poets",
  esoBookId: 784,
  bookIndex: 21,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
