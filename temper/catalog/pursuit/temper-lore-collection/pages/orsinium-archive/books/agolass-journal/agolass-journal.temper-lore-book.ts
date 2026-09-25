import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const agolassJournal = {
  id: "01a0d5f7-160a-753a-ab42-0ffc1882b75f",
  type: "page-type/temper-lore-book",
  slug: "agolass-journal",
  title: "Agolas's Journal",
  collection: "temper-lore-collection/orsinium-archive",
  esoBookId: 3053,
  bookIndex: 15,
  charted: true,
  quest: 5474,
  positions: "jsonl",
} as const satisfies TemperLoreBook
