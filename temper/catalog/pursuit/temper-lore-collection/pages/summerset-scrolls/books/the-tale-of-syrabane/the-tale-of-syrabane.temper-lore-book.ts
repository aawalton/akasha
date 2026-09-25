import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theTaleOfSyrabane = {
  id: "01a0d60a-d5be-7dbb-9e6f-7da29ec02682",
  type: "page-type/temper-lore-book",
  slug: "the-tale-of-syrabane",
  title: "The Tale of Syrabane",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 4902,
  bookIndex: 19,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
