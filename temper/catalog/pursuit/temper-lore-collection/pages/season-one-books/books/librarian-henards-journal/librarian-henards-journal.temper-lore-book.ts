import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const librarianHenardsJournal = {
  id: "01a0d60e-83ff-719a-9494-2de5b5ce4002",
  type: "page-type/temper-lore-book",
  slug: "librarian-henards-journal",
  title: "Librarian Henard's Journal",
  collection: "temper-lore-collection/season-one-books",
  bookIndex: 8,
} as const satisfies TemperLoreBook
