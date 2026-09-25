import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const charredJournal = {
  id: "01a0d60c-40bf-7490-ba34-d2def9987206",
  type: "page-type/temper-lore-book",
  slug: "charred-journal",
  title: "Charred Journal",
  collection: "temper-lore-collection/dispatches-from-the-deadlands",
  esoBookId: 6778,
  bookIndex: 76,
  charted: false,
} as const satisfies TemperLoreBook
