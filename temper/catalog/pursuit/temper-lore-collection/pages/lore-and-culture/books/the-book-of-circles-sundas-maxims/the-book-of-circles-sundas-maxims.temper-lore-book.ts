import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theBookOfCirclesSundasMaxims = {
  id: "01a0d5f3-3fdb-740a-90cd-5fe87392e871",
  type: "page-type/temper-lore-book",
  slug: "the-book-of-circles-sundas-maxims",
  title: "The Book of Circles, Sundas Maxims",
  collection: "temper-lore-collection/lore-and-culture",
  esoBookId: 1524,
  bookIndex: 66,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 30, mapCount: 4 },
    { mapId: 1060, mapCount: 1 },
  ],
} as const satisfies TemperLoreBook
