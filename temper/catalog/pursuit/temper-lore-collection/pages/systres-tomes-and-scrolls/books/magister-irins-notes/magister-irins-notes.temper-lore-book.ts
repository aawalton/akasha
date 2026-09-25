import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const magisterIrinsNotes = {
  id: "01a0d60c-75b5-72f4-b17e-5edfae914abe",
  type: "page-type/temper-lore-book",
  slug: "magister-irins-notes",
  title: "Magister Irin's Notes",
  collection: "temper-lore-collection/systres-tomes-and-scrolls",
  esoBookId: 7176,
  bookIndex: 53,
  charted: true,
  quest: 6771,
  positions: "jsonl",
} as const satisfies TemperLoreBook
