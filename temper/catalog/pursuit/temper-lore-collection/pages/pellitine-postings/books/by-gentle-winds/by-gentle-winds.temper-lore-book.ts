import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const byGentleWinds = {
  id: "01a0d60b-4e02-76c6-b9d7-6783c6f4d4d3",
  type: "page-type/temper-lore-book",
  slug: "by-gentle-winds",
  title: "By Gentle Winds",
  collection: "temper-lore-collection/pellitine-postings",
  esoBookId: 5730,
  bookIndex: 24,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
