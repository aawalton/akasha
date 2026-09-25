import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const thePrimateBeforeTheLight = {
  id: "01a0d5f7-73fb-787d-ada1-9ba1f4dc767a",
  type: "page-type/temper-lore-book",
  slug: "the-primate-before-the-light",
  title: "The Primate: Before the Light",
  collection: "temper-lore-collection/gold-coast-tomes",
  esoBookId: 3261,
  bookIndex: 9,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
