import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const skalgsJournal = {
  id: "01a0d5f7-160b-71a8-931c-5e73e1738120",
  type: "page-type/temper-lore-book",
  slug: "skalgs-journal",
  title: "Skalg's Journal",
  collection: "temper-lore-collection/orsinium-archive",
  esoBookId: 3207,
  bookIndex: 22,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
