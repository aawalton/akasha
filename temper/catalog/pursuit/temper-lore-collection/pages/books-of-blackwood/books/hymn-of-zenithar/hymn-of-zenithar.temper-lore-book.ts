import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const hymnOfZenithar = {
  id: "01a0d60b-fdb0-7e6c-872e-8395cf8ed047",
  type: "page-type/temper-lore-book",
  slug: "hymn-of-zenithar",
  title: "Hymn of Zenithar",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6525,
  bookIndex: 70,
  charted: true,
  onBookshelves: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
