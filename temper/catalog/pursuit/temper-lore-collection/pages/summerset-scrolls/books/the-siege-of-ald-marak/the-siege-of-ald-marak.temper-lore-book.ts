import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theSiegeOfAldMarak = {
  id: "01a0d60a-d5be-7800-94a8-0694c66a25a6",
  type: "page-type/temper-lore-book",
  slug: "the-siege-of-ald-marak",
  title: "The Siege of Ald Marak",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 4998,
  bookIndex: 22,
  charted: true,
  quest: 6115,
  positions: "jsonl",
} as const satisfies TemperLoreBook
