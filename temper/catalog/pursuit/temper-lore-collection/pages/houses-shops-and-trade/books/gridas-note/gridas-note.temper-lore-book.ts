import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const gridasNote = {
  id: "01a0d5f2-db26-7d1d-8d61-4121035fb589",
  type: "page-type/temper-lore-book",
  slug: "gridas-note",
  title: "Grida's Note",
  collection: "temper-lore-collection/houses-shops-and-trade",
  esoBookId: 467,
  bookIndex: 15,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
