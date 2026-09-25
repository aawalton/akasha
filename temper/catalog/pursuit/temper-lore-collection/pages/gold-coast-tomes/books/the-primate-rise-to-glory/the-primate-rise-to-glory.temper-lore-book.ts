import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const thePrimateRiseToGlory = {
  id: "01a0d5f7-73fb-744c-b006-eeb942192c5e",
  type: "page-type/temper-lore-book",
  slug: "the-primate-rise-to-glory",
  title: "The Primate: Rise to Glory",
  collection: "temper-lore-collection/gold-coast-tomes",
  esoBookId: 3278,
  bookIndex: 11,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
