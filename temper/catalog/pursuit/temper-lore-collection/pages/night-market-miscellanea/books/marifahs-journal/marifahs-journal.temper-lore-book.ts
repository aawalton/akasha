import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const marifahsJournal = {
  id: "01a0d60e-687f-7fa6-94e0-83ad11577af7",
  type: "page-type/temper-lore-book",
  slug: "marifahs-journal",
  title: "Marifah's Journal",
  collection: "temper-lore-collection/night-market-miscellanea",
  esoBookId: 8742,
  bookIndex: 28,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
