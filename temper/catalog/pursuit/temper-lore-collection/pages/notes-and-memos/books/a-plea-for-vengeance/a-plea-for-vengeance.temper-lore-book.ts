import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aPleaForVengeance = {
  id: "01a0d5f4-3c11-7070-bc9a-b3b5c86af02e",
  type: "page-type/temper-lore-book",
  slug: "a-plea-for-vengeance",
  title: "A Plea for Vengeance",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 1268,
  bookIndex: 28,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
