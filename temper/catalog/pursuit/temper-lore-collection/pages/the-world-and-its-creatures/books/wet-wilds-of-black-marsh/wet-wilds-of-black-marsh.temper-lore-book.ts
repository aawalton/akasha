import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const wetWildsOfBlackMarsh = {
  id: "01a0d5f5-f3e5-7063-922f-f1959451a485",
  type: "page-type/temper-lore-book",
  slug: "wet-wilds-of-black-marsh",
  title: "Wet Wilds of Black Marsh",
  collection: "temper-lore-collection/the-world-and-its-creatures",
  esoBookId: 1489,
  bookIndex: 33,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
