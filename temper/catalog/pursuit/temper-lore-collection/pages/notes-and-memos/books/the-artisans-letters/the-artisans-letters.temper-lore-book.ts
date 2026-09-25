import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theArtisansLetters = {
  id: "01a0d5f4-3c13-7b77-be82-da51487f7b75",
  type: "page-type/temper-lore-book",
  slug: "the-artisans-letters",
  title: "The Artisan's Letters",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 1745,
  bookIndex: 62,
  charted: true,
  quest: 4791,
  positions: "jsonl",
} as const satisfies TemperLoreBook
