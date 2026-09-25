import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const houseTelvanniSong = {
  id: "01a0d60c-eb9b-7902-8e45-aba272c946bd",
  type: "page-type/temper-lore-book",
  slug: "house-telvanni-song",
  title: "House Telvanni Song",
  collection: "temper-lore-collection/telvanni-tomes",
  esoBookId: 7804,
  bookIndex: 96,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
