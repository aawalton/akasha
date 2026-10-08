import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theGorge = {
  id: "01a0d60a-d5be-7eca-beec-2a56fafa368d",
  type: "page-type/temper-lore-book",
  slug: "the-gorge",
  title: "The Gorge",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 4849,
  bookIndex: 79,
  charted: true,
  quest: 6117,
  positions: "jsonl",
  createdAt: "2026-09-25T00:50:29.438Z",
  updatedAt: "2026-09-25T00:50:31.000Z",
} as const satisfies TemperLoreBook
