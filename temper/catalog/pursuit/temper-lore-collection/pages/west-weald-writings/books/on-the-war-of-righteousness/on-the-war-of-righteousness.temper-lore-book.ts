import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const onTheWarOfRighteousness = {
  id: "01a0d60d-4ab0-7caf-b4af-c2df5b293071",
  type: "page-type/temper-lore-book",
  slug: "on-the-war-of-righteousness",
  title: "On the War of Righteousness",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 7789,
  bookIndex: 8,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 2427, mapCount: 1 }],
} as const satisfies TemperLoreBook
