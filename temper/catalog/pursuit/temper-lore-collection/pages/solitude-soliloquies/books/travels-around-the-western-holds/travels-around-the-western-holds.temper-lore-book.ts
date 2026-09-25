import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const travelsAroundTheWesternHolds = {
  id: "01a0d60b-8109-7564-84fc-27038452cdda",
  type: "page-type/temper-lore-book",
  slug: "travels-around-the-western-holds",
  title: "Travels Around the Western Holds",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 6226,
  bookIndex: 51,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
