import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const myshkasJournal = {
  id: "01a0d60e-687f-73b8-ad11-c8de875b0a1d",
  type: "page-type/temper-lore-book",
  slug: "myshkas-journal",
  title: "Myshka's Journal",
  collection: "temper-lore-collection/night-market-miscellanea",
  esoBookId: 8730,
  bookIndex: 27,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
