import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ancientGravestone = {
  id: "01a0d60b-2344-7dcc-9763-9f26c001df6b",
  type: "page-type/temper-lore-book",
  slug: "ancient-gravestone",
  title: "Ancient Gravestone",
  collection: "temper-lore-collection/anequina-archives",
  esoBookId: 5426,
  bookIndex: 1,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
