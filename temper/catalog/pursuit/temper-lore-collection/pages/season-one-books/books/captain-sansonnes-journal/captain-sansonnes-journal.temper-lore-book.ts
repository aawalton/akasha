import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const captainSansonnesJournal = {
  id: "01a0d60e-83ff-7774-a82c-2df0efc4553e",
  type: "page-type/temper-lore-book",
  slug: "captain-sansonnes-journal",
  title: "Captain Sansonne's Journal",
  collection: "temper-lore-collection/season-one-books",
  bookIndex: 14,
} as const satisfies TemperLoreBook
