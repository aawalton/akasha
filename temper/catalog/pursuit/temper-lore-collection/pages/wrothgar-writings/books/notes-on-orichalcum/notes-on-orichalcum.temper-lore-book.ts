import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const notesOnOrichalcum = {
  id: "01a0d5f6-d68b-797a-a4e2-1b6b84a61eed",
  type: "page-type/temper-lore-book",
  slug: "notes-on-orichalcum",
  title: "Notes on Orichalcum",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 3029,
  bookIndex: 26,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
