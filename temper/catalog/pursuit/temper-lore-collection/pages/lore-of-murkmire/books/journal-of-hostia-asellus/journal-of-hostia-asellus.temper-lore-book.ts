import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const journalOfHostiaAsellus = {
  id: "01a0d5f6-a299-7162-aa9d-88925d96e8c2",
  type: "page-type/temper-lore-book",
  slug: "journal-of-hostia-asellus",
  title: "Journal of Hostia Asellus",
  collection: "temper-lore-collection/lore-of-murkmire",
  esoBookId: 5280,
  bookIndex: 71,
  charted: true,
  quest: 6279,
  positions: "jsonl",
} as const satisfies TemperLoreBook
