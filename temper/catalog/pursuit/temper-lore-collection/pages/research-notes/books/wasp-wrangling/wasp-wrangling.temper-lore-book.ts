import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const waspWrangling = {
  id: "01a0d5f5-1386-7282-8110-9775bb80e360",
  type: "page-type/temper-lore-book",
  slug: "wasp-wrangling",
  title: "Wasp Wrangling",
  collection: "temper-lore-collection/research-notes",
  esoBookId: 611,
  bookIndex: 23,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
