import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theDeal = {
  id: "01a0d5f7-73fb-77f5-8da0-fbdb8550276e",
  type: "page-type/temper-lore-book",
  slug: "the-deal",
  title: "The Deal",
  collection: "temper-lore-collection/gold-coast-tomes",
  esoBookId: 3684,
  bookIndex: 97,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
