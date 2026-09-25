import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const kalDruunsNotes = {
  id: "01a0d60b-8108-7c18-882e-0bc023423398",
  type: "page-type/temper-lore-book",
  slug: "kal-druuns-notes",
  title: "Kal Druun's Notes",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 5933,
  bookIndex: 22,
  charted: true,
  quest: 6466,
  positions: "jsonl",
} as const satisfies TemperLoreBook
