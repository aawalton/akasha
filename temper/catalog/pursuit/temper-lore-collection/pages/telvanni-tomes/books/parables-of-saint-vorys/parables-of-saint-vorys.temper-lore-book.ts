import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const parablesOfSaintVorys = {
  id: "01a0d60c-eb9c-78a6-910b-3e4348370831",
  type: "page-type/temper-lore-book",
  slug: "parables-of-saint-vorys",
  title: "Parables of Saint Vorys",
  collection: "temper-lore-collection/telvanni-tomes",
  esoBookId: 7772,
  bookIndex: 68,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
