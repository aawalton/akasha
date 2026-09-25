import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const eorimsTale = {
  id: "01a0d5f5-7766-7a2d-85dc-a556914a35ab",
  type: "page-type/temper-lore-book",
  slug: "eorims-tale",
  title: "Eorim's Tale",
  collection: "temper-lore-collection/tales-of-tamriel",
  esoBookId: 487,
  bookIndex: 8,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
