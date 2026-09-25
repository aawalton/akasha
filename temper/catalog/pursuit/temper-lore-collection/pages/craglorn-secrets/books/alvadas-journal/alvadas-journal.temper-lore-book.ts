import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const alvadasJournal = {
  id: "01a0d5f1-c919-7809-9524-b54f746a5b49",
  type: "page-type/temper-lore-book",
  slug: "alvadas-journal",
  title: "Alvada's Journal",
  collection: "temper-lore-collection/craglorn-secrets",
  esoBookId: 2391,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
