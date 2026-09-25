import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const mysteriousAkavir = {
  id: "01a0d60b-2345-74ff-8fe6-ae8b246ee49b",
  type: "page-type/temper-lore-book",
  slug: "mysterious-akavir",
  title: "Mysterious Akavir",
  collection: "temper-lore-collection/anequina-archives",
  esoBookId: 1964,
  bookIndex: 41,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
