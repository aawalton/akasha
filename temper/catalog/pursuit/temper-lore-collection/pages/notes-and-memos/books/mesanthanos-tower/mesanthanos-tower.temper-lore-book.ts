import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const mesanthanosTower = {
  id: "01a0d5f4-3c12-7550-a4f9-6bbee6e6ba6d",
  type: "page-type/temper-lore-book",
  slug: "mesanthanos-tower",
  title: "Mesanthano's Tower",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 2456,
  bookIndex: 100,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
