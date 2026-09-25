import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const zenitharsTest = {
  id: "01a0d60e-83ff-75af-8d0e-964f50f41d21",
  type: "page-type/temper-lore-book",
  slug: "zenithars-test",
  title: "Zenithar's Test",
  collection: "temper-lore-collection/season-one-books",
  bookIndex: 12,
} as const satisfies TemperLoreBook
