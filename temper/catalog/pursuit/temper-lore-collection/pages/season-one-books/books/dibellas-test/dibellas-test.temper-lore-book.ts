import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const dibellasTest = {
  id: "01a0d60e-83ff-7c71-a208-dc733ca0b588",
  type: "page-type/temper-lore-book",
  slug: "dibellas-test",
  title: "Dibella's Test",
  collection: "temper-lore-collection/season-one-books",
  bookIndex: 9,
} as const satisfies TemperLoreBook
