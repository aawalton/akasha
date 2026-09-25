import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const taharasTravelingMenagerie = {
  id: "01a0d60b-2345-7e58-882f-3a7b8b43e72a",
  type: "page-type/temper-lore-book",
  slug: "taharas-traveling-menagerie",
  title: "Tahara's Traveling Menagerie",
  collection: "temper-lore-collection/anequina-archives",
  esoBookId: 5399,
  bookIndex: 11,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
