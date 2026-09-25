import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const adainazsJournal = {
  id: "01a0d5f5-1383-73ad-aef0-8e14744e2eb0",
  type: "page-type/temper-lore-book",
  slug: "adainazs-journal",
  title: "Adainaz's Journal",
  collection: "temper-lore-collection/research-notes",
  esoBookId: 1737,
  bookIndex: 69,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
