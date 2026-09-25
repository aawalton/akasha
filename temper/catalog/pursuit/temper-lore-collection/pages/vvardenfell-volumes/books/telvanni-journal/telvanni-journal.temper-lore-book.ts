import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const telvanniJournal = {
  id: "01a0d5f7-aa99-75c7-9b00-e73a22a7ada0",
  type: "page-type/temper-lore-book",
  slug: "telvanni-journal",
  title: "Telvanni Journal",
  collection: "temper-lore-collection/vvardenfell-volumes",
  esoBookId: 4535,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
