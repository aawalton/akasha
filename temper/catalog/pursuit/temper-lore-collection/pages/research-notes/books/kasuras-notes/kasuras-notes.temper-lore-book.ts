import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const kasurasNotes = {
  id: "01a0d5f5-1384-71e1-b971-22472c62cc37",
  type: "page-type/temper-lore-book",
  slug: "kasuras-notes",
  title: "Kasura's Notes",
  collection: "temper-lore-collection/research-notes",
  esoBookId: 5634,
  charted: true,
  quest: 6395,
  positions: "jsonl",
} as const satisfies TemperLoreBook
