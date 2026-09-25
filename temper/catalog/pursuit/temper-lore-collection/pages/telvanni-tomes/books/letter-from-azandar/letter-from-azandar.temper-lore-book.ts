import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterFromAzandar = {
  id: "01a0d60c-eb9b-70aa-9e9c-db24510811ca",
  type: "page-type/temper-lore-book",
  slug: "letter-from-azandar",
  title: "Letter from Azandar",
  collection: "temper-lore-collection/telvanni-tomes",
  esoBookId: 7760,
  bookIndex: 94,
  charted: true,
  quest: 7023,
  positions: "jsonl",
} as const satisfies TemperLoreBook
