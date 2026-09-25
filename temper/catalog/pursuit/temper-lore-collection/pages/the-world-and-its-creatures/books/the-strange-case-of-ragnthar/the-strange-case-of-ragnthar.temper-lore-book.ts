import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theStrangeCaseOfRagnthar = {
  id: "01a0d5f5-f3e5-7ff5-ae2a-75c501f2da40",
  type: "page-type/temper-lore-book",
  slug: "the-strange-case-of-ragnthar",
  title: "The Strange Case of Ragnthar",
  collection: "temper-lore-collection/the-world-and-its-creatures",
  esoBookId: 2008,
  bookIndex: 53,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
