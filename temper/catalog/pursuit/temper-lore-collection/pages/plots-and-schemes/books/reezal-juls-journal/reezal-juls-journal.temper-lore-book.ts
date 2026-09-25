import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const reezalJulsJournal = {
  id: "01a0d5f4-c389-7f29-abe9-9df116e889b3",
  type: "page-type/temper-lore-book",
  slug: "reezal-juls-journal",
  title: "Reezal-Jul's Journal",
  collection: "temper-lore-collection/plots-and-schemes",
  esoBookId: 1922,
  bookIndex: 65,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
