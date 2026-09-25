import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theScrollOfAvalian = {
  id: "01a0d5f6-d68c-7663-842f-77c0a47fe761",
  type: "page-type/temper-lore-book",
  slug: "the-scroll-of-avalian",
  title: "The Scroll of Avalian",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 3058,
  bookIndex: 86,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
