import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theScrollOfVaia = {
  id: "01a0d5f6-d68c-7d17-8d41-2fcfbf049793",
  type: "page-type/temper-lore-book",
  slug: "the-scroll-of-vaia",
  title: "The Scroll of Vaia",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 3059,
  bookIndex: 87,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
