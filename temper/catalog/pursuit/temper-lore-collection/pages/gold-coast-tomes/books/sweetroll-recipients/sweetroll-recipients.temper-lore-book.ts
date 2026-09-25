import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const sweetrollRecipients = {
  id: "01a0d5f7-73fa-7969-8774-20d7cd158dc6",
  type: "page-type/temper-lore-book",
  slug: "sweetroll-recipients",
  title: "Sweetroll Recipients",
  collection: "temper-lore-collection/gold-coast-tomes",
  esoBookId: 3642,
  bookIndex: 32,
  charted: true,
  quest: 5664,
  positions: "jsonl",
} as const satisfies TemperLoreBook
