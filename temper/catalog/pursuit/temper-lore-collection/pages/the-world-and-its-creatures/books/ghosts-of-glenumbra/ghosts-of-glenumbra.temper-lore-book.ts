import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ghostsOfGlenumbra = {
  id: "01a0d5f5-f3e3-7180-9aa1-60f8d42c2b2e",
  type: "page-type/temper-lore-book",
  slug: "ghosts-of-glenumbra",
  title: "Ghosts of Glenumbra",
  collection: "temper-lore-collection/the-world-and-its-creatures",
  esoBookId: 680,
  bookIndex: 9,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
