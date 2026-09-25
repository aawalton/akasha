import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const onTheChamberOfLegates = {
  id: "01a0d60b-fdb0-746c-a0c4-cedcea35d487",
  type: "page-type/temper-lore-book",
  slug: "on-the-chamber-of-legates",
  title: "On the Chamber of Legates",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6735,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
