import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const druidSennasLastAccount = {
  id: "01a0d60c-baf3-76e4-b7e4-500018429692",
  type: "page-type/temper-lore-book",
  slug: "druid-sennas-last-account",
  title: "Druid Senna's Last Account",
  collection: "temper-lore-collection/archipelago-books-and-almanacs",
  esoBookId: 7300,
  bookIndex: 12,
  charted: true,
  quest: 6858,
  positions: "jsonl",
} as const satisfies TemperLoreBook
