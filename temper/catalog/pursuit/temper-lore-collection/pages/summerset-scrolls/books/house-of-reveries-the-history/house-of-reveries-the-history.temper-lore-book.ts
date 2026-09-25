import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const houseOfReveriesTheHistory = {
  id: "01a0d60a-d5bc-7a58-8d1d-058dd5185aa7",
  type: "page-type/temper-lore-book",
  slug: "house-of-reveries-the-history",
  title: "House of Reveries: The History",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 4840,
  bookIndex: 9,
  charted: true,
  quest: 6114,
  positions: "jsonl",
} as const satisfies TemperLoreBook
