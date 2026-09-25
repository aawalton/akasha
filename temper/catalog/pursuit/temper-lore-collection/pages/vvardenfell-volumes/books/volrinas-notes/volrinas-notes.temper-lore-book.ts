import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const volrinasNotes = {
  id: "01a0d5f7-aa9a-7ee2-bc70-e9150e85f516",
  type: "page-type/temper-lore-book",
  slug: "volrinas-notes",
  title: "Volrina's Notes",
  collection: "temper-lore-collection/vvardenfell-volumes",
  esoBookId: 4114,
  bookIndex: 93,
  charted: true,
  quest: 5893,
  positions: "jsonl",
} as const satisfies TemperLoreBook
