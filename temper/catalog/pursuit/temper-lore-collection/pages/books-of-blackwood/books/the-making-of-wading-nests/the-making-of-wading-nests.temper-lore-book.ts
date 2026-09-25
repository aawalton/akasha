import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theMakingOfWadingNests = {
  id: "01a0d60b-fdb1-7df6-ab48-2e5209c8fe7a",
  type: "page-type/temper-lore-book",
  slug: "the-making-of-wading-nests",
  title: "The Making of Wading-Nests",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6700,
  bookIndex: 97,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
