import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const surilsJournal = {
  id: "01a0d5e3-4278-7b92-a504-10146ca9ca52",
  type: "page-type/temper-lore-book",
  slug: "surils-journal",
  title: "Suril's Journal",
  collection: "temper-lore-collection/shadowfen-lore",
  bookIndex: 1,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
