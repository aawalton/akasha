import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToMagisterMelnRendys = {
  id: "01a0d60c-eb9b-7729-9c9f-1ae68774089b",
  type: "page-type/temper-lore-book",
  slug: "letter-to-magister-meln-rendys",
  title: "Letter to Magister Meln Rendys",
  collection: "temper-lore-collection/telvanni-tomes",
  esoBookId: 7630,
  bookIndex: 11,
  charted: true,
  quest: 6973,
  positions: "jsonl",
} as const satisfies TemperLoreBook
