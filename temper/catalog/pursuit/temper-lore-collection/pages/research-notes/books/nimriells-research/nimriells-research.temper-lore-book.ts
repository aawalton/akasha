import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const nimriellsResearch = {
  id: "01a0d5f5-1385-7abe-9a58-7cb37dfcb761",
  type: "page-type/temper-lore-book",
  slug: "nimriells-research",
  title: "Nimriell's Research",
  collection: "temper-lore-collection/research-notes",
  esoBookId: 2937,
  bookIndex: 93,
  charted: true,
  quest: 4968,
  positions: "jsonl",
} as const satisfies TemperLoreBook
