import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const sentientBeastsOfTheGallery = {
  id: "01a0d60d-156e-7384-ba39-991f59b73007",
  type: "page-type/temper-lore-book",
  slug: "sentient-beasts-of-the-gallery",
  title: "Sentient Beasts of the Gallery",
  collection: "temper-lore-collection/apocryphal-pages",
  esoBookId: 7662,
  bookIndex: 51,
  charted: true,
  quest: 6994,
  positions: "jsonl",
} as const satisfies TemperLoreBook
