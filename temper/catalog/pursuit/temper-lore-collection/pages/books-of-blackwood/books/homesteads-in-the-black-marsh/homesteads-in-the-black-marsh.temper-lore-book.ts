import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const homesteadsInTheBlackMarsh = {
  id: "01a0d60b-fdb0-738a-b9b1-18d097ae1627",
  type: "page-type/temper-lore-book",
  slug: "homesteads-in-the-black-marsh",
  title: "Homesteads in the Black Marsh",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6530,
  bookIndex: 74,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
