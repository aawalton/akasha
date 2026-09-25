import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const sophussSealedScroll = {
  id: "01a0d60b-fdb1-70f5-8629-eea44af159cd",
  type: "page-type/temper-lore-book",
  slug: "sophuss-sealed-scroll",
  title: "Sophus's Sealed Scroll",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6523,
  bookIndex: 11,
  charted: true,
  quest: 6615,
  positions: "jsonl",
} as const satisfies TemperLoreBook
