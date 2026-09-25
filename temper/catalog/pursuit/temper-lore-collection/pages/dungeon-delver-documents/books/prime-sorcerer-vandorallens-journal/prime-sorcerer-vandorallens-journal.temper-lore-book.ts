import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const primeSorcererVandorallensJournal = {
  id: "01a0d60d-708e-7ceb-a8c4-6a25af4ad491",
  type: "page-type/temper-lore-book",
  slug: "prime-sorcerer-vandorallens-journal",
  title: "Prime Sorcerer Vandorallen's Journal",
  collection: "temper-lore-collection/dungeon-delver-documents",
  esoBookId: 8171,
  bookIndex: 30,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
