import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const hogrogsJournal = {
  id: "01a0d60e-83ff-740d-a4f6-ac2af748a267",
  type: "page-type/temper-lore-book",
  slug: "hogrogs-journal",
  title: "Hogrog's Journal",
  collection: "temper-lore-collection/season-one-books",
  bookIndex: 24,
} as const satisfies TemperLoreBook
