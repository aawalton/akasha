import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theOrcSong = {
  id: "01a0d5f6-1c16-768e-a0a9-2a9bea384e3a",
  type: "page-type/temper-lore-book",
  slug: "the-orc-song",
  title: "The Orc Song",
  collection: "temper-lore-collection/words-of-the-poets",
  esoBookId: 393,
  bookIndex: 7,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
