import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theFurstockSong = {
  id: "01a0d60b-2346-7f78-9043-8c7fb51cba96",
  type: "page-type/temper-lore-book",
  slug: "the-furstock-song",
  title: "The Furstock Song",
  collection: "temper-lore-collection/anequina-archives",
  esoBookId: 5600,
  bookIndex: 57,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
