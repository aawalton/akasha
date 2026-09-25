import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const rhymesAndChimes = {
  id: "01a0d5f6-a29a-7d33-987f-9a3d328316da",
  type: "page-type/temper-lore-book",
  slug: "rhymes-and-chimes",
  title: "Rhymes and Chimes",
  collection: "temper-lore-collection/lore-of-murkmire",
  esoBookId: 5302,
  bookIndex: 59,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
