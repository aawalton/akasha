import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const anonymousJournal = {
  id: "01a0d5f4-c383-7c31-bbde-a019be323088",
  type: "page-type/temper-lore-book",
  slug: "anonymous-journal",
  title: "Anonymous Journal",
  collection: "temper-lore-collection/plots-and-schemes",
  esoBookId: 732,
  bookIndex: 21,
  charted: true,
  quest: 3610,
  positions: "jsonl",
} as const satisfies TemperLoreBook
