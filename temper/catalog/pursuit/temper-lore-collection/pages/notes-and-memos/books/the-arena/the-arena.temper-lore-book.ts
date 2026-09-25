import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theArena = {
  id: "01a0d5f4-3c13-7cf4-b227-270323071fb9",
  type: "page-type/temper-lore-book",
  slug: "the-arena",
  title: "The Arena!",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 1603,
  bookIndex: 52,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
