import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const dwarvenRuinExplorersJournal = {
  id: "01a0d5f5-1384-7852-9ced-d973de602a9a",
  type: "page-type/temper-lore-book",
  slug: "dwarven-ruin-explorers-journal",
  title: "Dwarven Ruin Explorer's Journal",
  collection: "temper-lore-collection/research-notes",
  esoBookId: 858,
  bookIndex: 26,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
