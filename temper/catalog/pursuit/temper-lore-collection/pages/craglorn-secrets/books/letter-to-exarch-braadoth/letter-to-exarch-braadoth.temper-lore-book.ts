import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToExarchBraadoth = {
  id: "01a0d5f1-c91a-7cd0-bee9-772ba7a9bc4d",
  type: "page-type/temper-lore-book",
  slug: "letter-to-exarch-braadoth",
  title: "Letter to Exarch Braadoth",
  collection: "temper-lore-collection/craglorn-secrets",
  esoBookId: 2711,
  bookIndex: 90,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
