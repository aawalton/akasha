import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ogresASummary = {
  id: "01a0d5f5-f3e4-7a4f-9156-f9bf450ca73a",
  type: "page-type/temper-lore-book",
  slug: "ogres-a-summary",
  title: "Ogres: A Summary",
  collection: "temper-lore-collection/the-world-and-its-creatures",
  esoBookId: 1497,
  bookIndex: 62,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
