import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const mythsAndLegendsOfTheHist = {
  id: "01a0d5f3-3fdb-7e77-8781-ae466099bb8e",
  type: "page-type/temper-lore-book",
  slug: "myths-and-legends-of-the-hist",
  title: "Myths and Legends of the Hist",
  collection: "temper-lore-collection/lore-and-culture",
  esoBookId: 1495,
  bookIndex: 63,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
