import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const strangeRamblingNotes = {
  id: "01a0d5f5-abba-7a68-8fea-52c26dac36d8",
  type: "page-type/temper-lore-book",
  slug: "strange-rambling-notes",
  title: "Strange Rambling Notes",
  collection: "temper-lore-collection/the-devoted-and-the-deranged",
  esoBookId: 1907,
  bookIndex: 60,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
