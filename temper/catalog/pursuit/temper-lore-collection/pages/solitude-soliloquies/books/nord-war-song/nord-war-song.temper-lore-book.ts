import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const nordWarSong = {
  id: "01a0d60b-8108-7e68-9419-3c83dc817b9c",
  type: "page-type/temper-lore-book",
  slug: "nord-war-song",
  title: "Nord War Song",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 6078,
  bookIndex: 6,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
