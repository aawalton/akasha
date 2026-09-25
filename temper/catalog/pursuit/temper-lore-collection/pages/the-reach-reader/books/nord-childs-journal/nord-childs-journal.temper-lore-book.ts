import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const nordChildsJournal = {
  id: "01a0d60b-c958-7202-9bfd-d288ad503ae4",
  type: "page-type/temper-lore-book",
  slug: "nord-childs-journal",
  title: "Nord Child's Journal",
  collection: "temper-lore-collection/the-reach-reader",
  esoBookId: 5963,
  bookIndex: 32,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
