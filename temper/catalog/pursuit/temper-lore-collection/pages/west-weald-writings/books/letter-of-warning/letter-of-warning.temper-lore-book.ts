import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterOfWarning = {
  id: "01a0d60d-4aaf-78b5-813a-df561426e2cf",
  type: "page-type/temper-lore-book",
  slug: "letter-of-warning",
  title: "Letter of Warning",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 7835,
  bookIndex: 66,
  charted: true,
  quest: 7082,
  positions: "jsonl",
} as const satisfies TemperLoreBook
