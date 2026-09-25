import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const beastsOfTheGallery = {
  id: "01a0d60d-156d-7a4f-a4df-459097e992d3",
  type: "page-type/temper-lore-book",
  slug: "beasts-of-the-gallery",
  title: "Beasts of the Gallery",
  collection: "temper-lore-collection/apocryphal-pages",
  esoBookId: 7620,
  bookIndex: 45,
  charted: true,
  quest: 6994,
  positions: "jsonl",
} as const satisfies TemperLoreBook
