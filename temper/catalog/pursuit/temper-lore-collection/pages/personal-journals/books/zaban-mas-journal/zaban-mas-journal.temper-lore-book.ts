import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const zabanMasJournal = {
  id: "01a0d5f4-6f1b-7e07-8472-c597278f54cf",
  type: "page-type/temper-lore-book",
  slug: "zaban-mas-journal",
  title: "Zaban-ma's Journal",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 1515,
  bookIndex: 60,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
