import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const redEaglesSong = {
  id: "01a0d60b-c958-7c34-bcb0-88cf265d4fbd",
  type: "page-type/temper-lore-book",
  slug: "red-eagles-song",
  title: "Red Eagle's Song",
  collection: "temper-lore-collection/the-reach-reader",
  esoBookId: 6361,
  bookIndex: 2,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 42, mapCount: 2 }],
  positions: "jsonl",
} as const satisfies TemperLoreBook
