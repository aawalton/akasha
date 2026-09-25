import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const gasconesMemorandum = {
  id: "01a0d60a-a213-74a5-9b06-9d2b348cde4d",
  type: "page-type/temper-lore-book",
  slug: "gascones-memorandum",
  title: "Gascone's Memorandum",
  collection: "temper-lore-collection/clockwork-mnemonix",
  esoBookId: 4556,
  bookIndex: 23,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
