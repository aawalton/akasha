import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const endOfTheJourney = {
  id: "01a0d5f5-f3e3-7614-a36d-3fae102d25c8",
  type: "page-type/temper-lore-book",
  slug: "end-of-the-journey",
  title: "End of the Journey",
  collection: "temper-lore-collection/the-world-and-its-creatures",
  esoBookId: 1036,
  bookIndex: 20,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
