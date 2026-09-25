import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const gavrossJournal = {
  id: "01a0d5f7-aa98-7882-87dd-1e9b489800bd",
  type: "page-type/temper-lore-book",
  slug: "gavross-journal",
  title: "Gavros's Journal",
  collection: "temper-lore-collection/vvardenfell-volumes",
  esoBookId: 4034,
  bookIndex: 44,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
