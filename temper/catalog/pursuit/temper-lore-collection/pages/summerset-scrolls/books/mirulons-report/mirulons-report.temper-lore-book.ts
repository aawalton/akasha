import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const mirulonsReport = {
  id: "01a0d60a-d5bd-755d-aa20-a735a3428f6e",
  type: "page-type/temper-lore-book",
  slug: "mirulons-report",
  title: "Mirulon's Report",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 4925,
  bookIndex: 93,
  charted: true,
  quest: 6116,
  positions: "jsonl",
} as const satisfies TemperLoreBook
