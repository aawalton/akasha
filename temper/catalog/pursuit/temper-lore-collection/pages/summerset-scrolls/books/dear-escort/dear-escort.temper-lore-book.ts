import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const dearEscort = {
  id: "01a0d60a-d5bc-74d1-9021-4200fc2a16bd",
  type: "page-type/temper-lore-book",
  slug: "dear-escort",
  title: "Dear Escort",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 4806,
  bookIndex: 43,
  charted: true,
  quest: 6119,
  positions: "jsonl",
} as const satisfies TemperLoreBook
