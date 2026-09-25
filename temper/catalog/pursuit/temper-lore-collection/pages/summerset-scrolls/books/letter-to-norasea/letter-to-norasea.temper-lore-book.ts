import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToNorasea = {
  id: "01a0d60a-d5bd-72ea-a666-b219277f9b05",
  type: "page-type/temper-lore-book",
  slug: "letter-to-norasea",
  title: "Letter to Norasea",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 4698,
  bookIndex: 62,
  charted: true,
  quest: 6111,
  positions: "jsonl",
} as const satisfies TemperLoreBook
