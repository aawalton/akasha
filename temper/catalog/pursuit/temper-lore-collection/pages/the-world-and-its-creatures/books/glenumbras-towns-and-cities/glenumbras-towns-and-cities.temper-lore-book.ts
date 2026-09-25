import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const glenumbrasTownsAndCities = {
  id: "01a0d5f5-f3e3-7292-b09d-8f6d3115e904",
  type: "page-type/temper-lore-book",
  slug: "glenumbras-towns-and-cities",
  title: "Glenumbra's Towns and Cities",
  collection: "temper-lore-collection/the-world-and-its-creatures",
  esoBookId: 754,
  bookIndex: 11,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
