import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToMatusAmnis = {
  id: "01a0d60b-fdb0-708b-b8ee-5216a61cb98e",
  type: "page-type/temper-lore-book",
  slug: "letter-to-matus-amnis",
  title: "Letter to Matus Amnis",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6506,
  bookIndex: 3,
  charted: true,
  quest: 6619,
  positions: "jsonl",
} as const satisfies TemperLoreBook
