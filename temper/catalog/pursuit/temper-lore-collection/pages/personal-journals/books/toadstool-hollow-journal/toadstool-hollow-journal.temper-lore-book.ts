import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const toadstoolHollowJournal = {
  id: "01a0d5f4-6f1b-7264-a025-36fb1ba1af50",
  type: "page-type/temper-lore-book",
  slug: "toadstool-hollow-journal",
  title: "Toadstool Hollow Journal",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 1938,
  bookIndex: 78,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
