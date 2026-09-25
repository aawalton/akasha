import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theMinotaurSong = {
  id: "01a0d5f7-73fb-77a5-98ee-cad324636753",
  type: "page-type/temper-lore-book",
  slug: "the-minotaur-song",
  title: "The Minotaur Song",
  collection: "temper-lore-collection/gold-coast-tomes",
  esoBookId: 3699,
  bookIndex: 85,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 29, mapCount: 1 }],
  positions: "jsonl",
} as const satisfies TemperLoreBook
