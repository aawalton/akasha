import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToEvisMarys = {
  id: "01a0d5f2-253b-795e-ba45-a66154ef02b7",
  type: "page-type/temper-lore-book",
  slug: "letter-to-evis-marys",
  title: "Letter to Evis Marys",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 733,
  bookIndex: 24,
  charted: true,
  quest: 3610,
  positions: "jsonl",
} as const satisfies TemperLoreBook
