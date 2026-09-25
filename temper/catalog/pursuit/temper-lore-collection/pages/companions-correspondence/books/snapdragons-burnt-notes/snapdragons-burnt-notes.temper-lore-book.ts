import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const snapdragonsBurntNotes = {
  id: "01a0d60d-bbe4-74e3-8781-5dedb464d51a",
  type: "page-type/temper-lore-book",
  slug: "snapdragons-burnt-notes",
  title: "Snapdragon's Burnt Notes",
  collection: "temper-lore-collection/companions-correspondence",
  esoBookId: 8307,
  bookIndex: 20,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
