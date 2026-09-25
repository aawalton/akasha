import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const noteToCaptainHenrisa = {
  id: "01a0d5f6-d68b-7c4f-b7d7-f4bdbb7a307e",
  type: "page-type/temper-lore-book",
  slug: "note-to-captain-henrisa",
  title: "Note to Captain Henrisa",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 3020,
  bookIndex: 56,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
