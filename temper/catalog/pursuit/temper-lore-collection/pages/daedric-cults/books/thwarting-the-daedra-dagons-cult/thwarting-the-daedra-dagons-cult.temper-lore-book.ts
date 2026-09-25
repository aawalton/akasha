import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const thwartingTheDaedraDagonsCult = {
  id: "01a0d5f2-253c-72f6-a6a6-79b9187f453f",
  type: "page-type/temper-lore-book",
  slug: "thwarting-the-daedra-dagons-cult",
  title: "Thwarting the Daedra: Dagon's Cult",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 2947,
  bookIndex: 79,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 26, mapCount: 1 }],
  positions: "jsonl",
} as const satisfies TemperLoreBook
