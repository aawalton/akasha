import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theGarbledGrimoire = {
  id: "01a0d60e-83ff-75b0-b531-37364e5997d9",
  type: "page-type/temper-lore-book",
  slug: "the-garbled-grimoire",
  title: "The Garbled Grimoire",
  collection: "temper-lore-collection/season-one-books",
  bookIndex: 27,
} as const satisfies TemperLoreBook
