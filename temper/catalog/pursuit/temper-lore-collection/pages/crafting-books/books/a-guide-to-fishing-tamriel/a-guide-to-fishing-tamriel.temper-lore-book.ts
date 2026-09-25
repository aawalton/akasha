import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aGuideToFishingTamriel = {
  id: "01a0d5e6-c6d4-7574-ae4c-3a945696b1ca",
  type: "page-type/temper-lore-book",
  slug: "a-guide-to-fishing-tamriel",
  title: "A Guide to Fishing Tamriel",
  collection: "temper-lore-collection/crafting-books",
  bookIndex: 1,
} as const satisfies TemperLoreBook
