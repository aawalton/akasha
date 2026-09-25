import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theMinersLament = {
  id: "01a0d5f6-1c16-7827-9f0a-dad3f69157a8",
  type: "page-type/temper-lore-book",
  slug: "the-miners-lament",
  title: "The Miner's Lament",
  collection: "temper-lore-collection/words-of-the-poets",
  esoBookId: 1286,
  bookIndex: 43,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
