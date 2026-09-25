import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theTempestAndTheSunflower = {
  id: "01a0d60c-baf4-71c5-b600-bce8a9135533",
  type: "page-type/temper-lore-book",
  slug: "the-tempest-and-the-sunflower",
  title: "The Tempest and the Sunflower",
  collection: "temper-lore-collection/archipelago-books-and-almanacs",
  esoBookId: 7525,
  bookIndex: 40,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 2212, mapCount: 1 }],
} as const satisfies TemperLoreBook
