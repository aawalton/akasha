import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const calissJournal = {
  id: "01a0d60b-c957-710a-b417-62cd3edd564e",
  type: "page-type/temper-lore-book",
  slug: "caliss-journal",
  title: "Calis's Journal",
  collection: "temper-lore-collection/the-reach-reader",
  esoBookId: 6387,
  bookIndex: 61,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
