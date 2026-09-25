import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const darkMinistrations = {
  id: "01a0d5f5-abb9-7d1a-b127-25d6588500fd",
  type: "page-type/temper-lore-book",
  slug: "dark-ministrations",
  title: "Dark Ministrations",
  collection: "temper-lore-collection/the-devoted-and-the-deranged",
  esoBookId: 144,
  bookIndex: 7,
  charted: true,
  quest: 3987,
  positions: "jsonl",
} as const satisfies TemperLoreBook
