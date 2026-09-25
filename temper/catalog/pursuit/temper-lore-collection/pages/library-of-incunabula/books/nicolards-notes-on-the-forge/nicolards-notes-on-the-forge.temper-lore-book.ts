import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const nicolardsNotesOnTheForge = {
  id: "01a0d5f8-02f9-79b0-bf01-9d48e1855fbc",
  type: "page-type/temper-lore-book",
  slug: "nicolards-notes-on-the-forge",
  title: "Nicolard's Notes on the Forge",
  collection: "temper-lore-collection/library-of-incunabula",
  esoBookId: 4618,
  bookIndex: 10,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
