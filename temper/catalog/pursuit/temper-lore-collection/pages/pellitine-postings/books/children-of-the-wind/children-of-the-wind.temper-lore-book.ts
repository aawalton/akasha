import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const childrenOfTheWind = {
  id: "01a0d60b-4e02-744e-9794-922748cfc9dd",
  type: "page-type/temper-lore-book",
  slug: "children-of-the-wind",
  title: "Children of the Wind",
  collection: "temper-lore-collection/pellitine-postings",
  esoBookId: 5703,
  bookIndex: 19,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 37, mapCount: 18 }],
  positions: "jsonl",
} as const satisfies TemperLoreBook
