import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theHandfastSongList = {
  id: "01a0d5f2-db26-7a13-8182-e026b130f165",
  type: "page-type/temper-lore-book",
  slug: "the-handfast-song-list",
  title: "The Handfast Song List",
  collection: "temper-lore-collection/houses-shops-and-trade",
  esoBookId: 740,
  bookIndex: 32,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
