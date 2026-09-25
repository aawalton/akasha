import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const onTheNatureOfNymics = {
  id: "01a0d60d-156e-7c0c-8440-78670204d3b6",
  type: "page-type/temper-lore-book",
  slug: "on-the-nature-of-nymics",
  title: "On the Nature of Nymics",
  collection: "temper-lore-collection/apocryphal-pages",
  esoBookId: 7437,
  bookIndex: 19,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 2275, mapCount: 1 }],
} as const satisfies TemperLoreBook
