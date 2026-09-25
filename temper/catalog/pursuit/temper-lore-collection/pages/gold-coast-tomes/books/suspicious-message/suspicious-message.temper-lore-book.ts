import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const suspiciousMessage = {
  id: "01a0d5f7-73fa-7da6-9e4c-1551dedacb90",
  type: "page-type/temper-lore-book",
  slug: "suspicious-message",
  title: "Suspicious Message",
  collection: "temper-lore-collection/gold-coast-tomes",
  esoBookId: 3646,
  bookIndex: 33,
  charted: true,
  quest: 5664,
  positions: "jsonl",
} as const satisfies TemperLoreBook
