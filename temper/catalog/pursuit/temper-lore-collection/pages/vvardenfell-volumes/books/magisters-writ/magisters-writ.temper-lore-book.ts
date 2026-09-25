import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const magistersWrit = {
  id: "01a0d5f7-aa99-732b-8bdf-668e127a8df2",
  type: "page-type/temper-lore-book",
  slug: "magisters-writ",
  title: "Magister's Writ",
  collection: "temper-lore-collection/vvardenfell-volumes",
  esoBookId: 3962,
  bookIndex: 100,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
