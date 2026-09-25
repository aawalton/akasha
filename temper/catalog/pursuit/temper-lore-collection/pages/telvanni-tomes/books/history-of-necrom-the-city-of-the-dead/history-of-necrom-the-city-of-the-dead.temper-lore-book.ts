import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const historyOfNecromTheCityOfTheDead = {
  id: "01a0d60c-eb9b-709d-ae40-9bd987b78f9a",
  type: "page-type/temper-lore-book",
  slug: "history-of-necrom-the-city-of-the-dead",
  title: "History of Necrom: The City of the Dead",
  collection: "temper-lore-collection/telvanni-tomes",
  esoBookId: 7447,
  bookIndex: 54,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 2274, mapCount: 1 }],
  positions: "jsonl",
} as const satisfies TemperLoreBook
