import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const fieldGuideToRiverTrolls = {
  id: "01a0d5f7-73f9-7353-ae91-8b476734a55a",
  type: "page-type/temper-lore-book",
  slug: "field-guide-to-river-trolls",
  title: "Field Guide to River Trolls",
  collection: "temper-lore-collection/gold-coast-tomes",
  esoBookId: 3674,
  bookIndex: 50,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
