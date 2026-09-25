import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const mistressDrathasJournal = {
  id: "01a0d5f7-aa99-78ef-a174-6c92b8561041",
  type: "page-type/temper-lore-book",
  slug: "mistress-drathas-journal",
  title: "Mistress Dratha's Journal",
  collection: "temper-lore-collection/vvardenfell-volumes",
  esoBookId: 4544,
  bookIndex: 66,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
