import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const melleronsJournal = {
  id: "01a0d60b-2345-742f-9659-b5e7e24d0280",
  type: "page-type/temper-lore-book",
  slug: "mellerons-journal",
  title: "Melleron's Journal",
  collection: "temper-lore-collection/anequina-archives",
  esoBookId: 5478,
  bookIndex: 90,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
