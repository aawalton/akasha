import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const notesOnRazak = {
  id: "01a0d5f5-1385-77c0-8f78-9b6cbfd1bb11",
  type: "page-type/temper-lore-book",
  slug: "notes-on-razak",
  title: "Notes on Razak",
  collection: "temper-lore-collection/research-notes",
  esoBookId: 2064,
  bookIndex: 80,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
