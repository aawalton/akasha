import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ondagoresJournal = {
  id: "01a0d5f8-02f9-74d0-94e0-7a0a448b2bad",
  type: "page-type/temper-lore-book",
  slug: "ondagores-journal",
  title: "Ondagore's Journal",
  collection: "temper-lore-collection/library-of-incunabula",
  esoBookId: 5689,
  bookIndex: 70,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
