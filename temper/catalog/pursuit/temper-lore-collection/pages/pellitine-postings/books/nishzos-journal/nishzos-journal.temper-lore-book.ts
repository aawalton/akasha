import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const nishzosJournal = {
  id: "01a0d60b-4e03-722b-b023-0b5d2202027b",
  type: "page-type/temper-lore-book",
  slug: "nishzos-journal",
  title: "Nishzo's Journal",
  collection: "temper-lore-collection/pellitine-postings",
  esoBookId: 5672,
  bookIndex: 13,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
