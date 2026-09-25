import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const houseRedoranAdvisory = {
  id: "01a0d5f7-aa98-774a-b221-03a022ea4d42",
  type: "page-type/temper-lore-book",
  slug: "house-redoran-advisory",
  title: "House Redoran Advisory",
  collection: "temper-lore-collection/vvardenfell-volumes",
  esoBookId: 4109,
  bookIndex: 32,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
