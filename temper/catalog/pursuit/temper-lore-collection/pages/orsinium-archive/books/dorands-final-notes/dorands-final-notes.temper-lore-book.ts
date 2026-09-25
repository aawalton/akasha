import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const dorandsFinalNotes = {
  id: "01a0d5f7-160b-724d-977a-8ac21cc692bf",
  type: "page-type/temper-lore-book",
  slug: "dorands-final-notes",
  title: "Dorand's Final Notes",
  collection: "temper-lore-collection/orsinium-archive",
  esoBookId: 3032,
  bookIndex: 29,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
