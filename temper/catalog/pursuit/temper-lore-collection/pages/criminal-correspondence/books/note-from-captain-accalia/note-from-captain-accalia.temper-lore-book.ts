import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const noteFromCaptainAccalia = {
  id: "01a0d5f1-f451-7293-a20e-f5295e6df92f",
  type: "page-type/temper-lore-book",
  slug: "note-from-captain-accalia",
  title: "Note from Captain Accalia",
  collection: "temper-lore-collection/criminal-correspondence",
  esoBookId: 1533,
  bookIndex: 57,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
