import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const gravestoneNotes = {
  id: "01a0d5f4-07b8-7c72-97af-a25aee93d467",
  type: "page-type/temper-lore-book",
  slug: "gravestone-notes",
  title: "Gravestone Notes",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 2063,
  bookIndex: 54,
  charted: true,
  quest: 4980,
  positions: "jsonl",
} as const satisfies TemperLoreBook
