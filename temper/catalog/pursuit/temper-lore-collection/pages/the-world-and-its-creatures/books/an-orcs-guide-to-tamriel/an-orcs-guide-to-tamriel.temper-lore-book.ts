import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const anOrcsGuideToTamriel = {
  id: "01a0d5f5-f3e3-738f-8a3c-53658ad87b93",
  type: "page-type/temper-lore-book",
  slug: "an-orcs-guide-to-tamriel",
  title: "An Orc's Guide to Tamriel",
  collection: "temper-lore-collection/the-world-and-its-creatures",
  esoBookId: 2163,
  bookIndex: 59,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
