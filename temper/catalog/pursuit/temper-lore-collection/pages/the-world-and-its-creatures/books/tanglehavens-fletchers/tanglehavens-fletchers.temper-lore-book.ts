import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const tanglehavensFletchers = {
  id: "01a0d5f5-f3e4-7201-ac68-4aa38eea8e01",
  type: "page-type/temper-lore-book",
  slug: "tanglehavens-fletchers",
  title: "Tanglehaven's Fletchers",
  collection: "temper-lore-collection/the-world-and-its-creatures",
  esoBookId: 1073,
  bookIndex: 21,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
