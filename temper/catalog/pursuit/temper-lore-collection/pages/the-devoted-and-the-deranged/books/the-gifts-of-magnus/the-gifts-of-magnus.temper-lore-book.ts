import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theGiftsOfMagnus = {
  id: "01a0d5f5-abbb-7970-b030-79ad5274513c",
  type: "page-type/temper-lore-book",
  slug: "the-gifts-of-magnus",
  title: "The Gifts of Magnus",
  collection: "temper-lore-collection/the-devoted-and-the-deranged",
  esoBookId: 764,
  bookIndex: 25,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
