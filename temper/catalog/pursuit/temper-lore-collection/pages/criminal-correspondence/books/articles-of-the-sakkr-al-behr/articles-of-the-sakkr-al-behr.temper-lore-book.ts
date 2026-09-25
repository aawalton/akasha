import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const articlesOfTheSakkrAlBehr = {
  id: "01a0d5f1-f450-7689-b6d6-24b44d61a55b",
  type: "page-type/temper-lore-book",
  slug: "articles-of-the-sakkr-al-behr",
  title: "Articles of the Sakkr-al-Behr",
  collection: "temper-lore-collection/criminal-correspondence",
  esoBookId: 671,
  bookIndex: 24,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
