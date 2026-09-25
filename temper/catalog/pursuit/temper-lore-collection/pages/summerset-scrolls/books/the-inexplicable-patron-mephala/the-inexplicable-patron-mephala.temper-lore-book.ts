import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theInexplicablePatronMephala = {
  id: "01a0d60a-d5be-73e6-b71a-655eaf2c2030",
  type: "page-type/temper-lore-book",
  slug: "the-inexplicable-patron-mephala",
  title: "The Inexplicable Patron: Mephala",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 4879,
  bookIndex: 7,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 1349, mapCount: 48 },
    { mapId: 1429, mapCount: 16 },
  ],
} as const satisfies TemperLoreBook
