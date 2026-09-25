import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const snorfinsNotes = {
  id: "01a0d5f7-aa99-7339-9223-77e0d147ccf8",
  type: "page-type/temper-lore-book",
  slug: "snorfins-notes",
  title: "Snorfin's Notes",
  collection: "temper-lore-collection/vvardenfell-volumes",
  esoBookId: 4101,
  bookIndex: 92,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
