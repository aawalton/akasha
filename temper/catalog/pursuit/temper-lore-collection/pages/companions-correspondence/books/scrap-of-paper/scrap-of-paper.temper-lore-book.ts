import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const scrapOfPaper = {
  id: "01a0d60d-bbe4-7b2c-915e-eff9fc2c852a",
  type: "page-type/temper-lore-book",
  slug: "scrap-of-paper",
  title: "Scrap of Paper",
  collection: "temper-lore-collection/companions-correspondence",
  esoBookId: 8007,
  bookIndex: 5,
  charted: true,
  quest: 7186,
  positions: "jsonl",
} as const satisfies TemperLoreBook
