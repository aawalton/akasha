import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theNeverEndingScroll = {
  id: "01a0d60a-f1ec-7ea0-9db4-f9e0eca08e68",
  type: "page-type/temper-lore-book",
  slug: "the-never-ending-scroll",
  title: "The Never-Ending Scroll",
  collection: "temper-lore-collection/moawita-memories",
  esoBookId: 4823,
  bookIndex: 9,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
