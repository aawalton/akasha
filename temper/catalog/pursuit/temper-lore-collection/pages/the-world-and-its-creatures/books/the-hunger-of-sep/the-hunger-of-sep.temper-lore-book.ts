import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theHungerOfSep = {
  id: "01a0d5f5-f3e5-7c4c-9455-ae1b65cc63e1",
  type: "page-type/temper-lore-book",
  slug: "the-hunger-of-sep",
  title: "The Hunger of Sep",
  collection: "temper-lore-collection/the-world-and-its-creatures",
  esoBookId: 1777,
  bookIndex: 44,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
