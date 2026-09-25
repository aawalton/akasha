import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const phynastersTest = {
  id: "01a0d60e-83ff-7097-87fd-eaab26a2b2e3",
  type: "page-type/temper-lore-book",
  slug: "phynasters-test",
  title: "Phynaster's Test",
  collection: "temper-lore-collection/season-one-books",
  bookIndex: 10,
} as const satisfies TemperLoreBook
