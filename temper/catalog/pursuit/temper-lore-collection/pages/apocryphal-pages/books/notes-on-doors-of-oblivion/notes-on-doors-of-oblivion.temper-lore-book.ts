import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const notesOnDoorsOfOblivion = {
  id: "01a0d60d-156e-7e6f-9bbc-5ba40eac8dc6",
  type: "page-type/temper-lore-book",
  slug: "notes-on-doors-of-oblivion",
  title: "Notes on Doors of Oblivion",
  collection: "temper-lore-collection/apocryphal-pages",
  esoBookId: 7615,
  bookIndex: 43,
  charted: true,
  quest: 6994,
  positions: "jsonl",
} as const satisfies TemperLoreBook
