import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ardiasJournal = {
  id: "01a0d60b-fdaf-7ee7-a40f-2d019d39e175",
  type: "page-type/temper-lore-book",
  slug: "ardias-journal",
  title: "Ardia's Journal",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6602,
  bookIndex: 24,
  charted: true,
  positions: "jsonl",
  createdAt: "2026-09-25T00:51:45.199Z",
  updatedAt: "2026-09-25T00:51:47.000Z",
} as const satisfies TemperLoreBook
