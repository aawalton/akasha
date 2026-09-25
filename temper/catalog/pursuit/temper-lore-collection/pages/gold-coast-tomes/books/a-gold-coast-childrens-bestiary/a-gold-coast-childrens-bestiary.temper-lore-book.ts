import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aGoldCoastChildrensBestiary = {
  id: "01a0d5f7-73f9-77e8-a840-f5c2424e425e",
  type: "page-type/temper-lore-book",
  slug: "a-gold-coast-childrens-bestiary",
  title: "A Gold Coast Children's Bestiary",
  collection: "temper-lore-collection/gold-coast-tomes",
  esoBookId: 3698,
  bookIndex: 72,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 29, mapCount: 1 }],
  positions: "jsonl",
} as const satisfies TemperLoreBook
