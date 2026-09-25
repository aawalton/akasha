import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const discomfortsOfWar = {
  id: "01a0d5f6-6d40-7093-ba4a-0c1e298b2f92",
  type: "page-type/temper-lore-book",
  slug: "discomforts-of-war",
  title: "Discomforts of War",
  collection: "temper-lore-collection/skill-books",
  esoBookId: 2255,
  bookIndex: 18,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
