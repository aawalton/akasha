import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const gamirthsFinalMessage = {
  id: "01a0d5f6-45ad-797d-9196-c9325bb6bca8",
  type: "page-type/temper-lore-book",
  slug: "gamirths-final-message",
  title: "Gamirth's Final Message",
  collection: "temper-lore-collection/final-words",
  esoBookId: 1751,
  bookIndex: 46,
  charted: true,
  quest: 4347,
  positions: "jsonl",
} as const satisfies TemperLoreBook
