import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const morgaulleDecherysJournal = {
  id: "01a0d5f4-6f1b-71d4-b5ea-be1ce02e457f",
  type: "page-type/temper-lore-book",
  slug: "morgaulle-decherys-journal",
  title: "Morgaulle Dechery's Journal",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 2043,
  bookIndex: 84,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
