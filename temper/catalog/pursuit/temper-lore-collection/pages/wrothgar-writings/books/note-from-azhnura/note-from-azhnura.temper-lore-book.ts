import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const noteFromAzhnura = {
  id: "01a0d5f6-d68b-79d2-9163-fad2a4f3beaa",
  type: "page-type/temper-lore-book",
  slug: "note-from-azhnura",
  title: "Note from Azhnura",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 3141,
  bookIndex: 93,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
