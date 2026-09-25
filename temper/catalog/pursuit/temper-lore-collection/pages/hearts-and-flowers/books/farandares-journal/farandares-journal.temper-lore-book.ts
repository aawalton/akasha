import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const farandaresJournal = {
  id: "01a0d5f2-af6f-70d9-b6df-4ad4cd0943d0",
  type: "page-type/temper-lore-book",
  slug: "farandares-journal",
  title: "Farandare's Journal",
  collection: "temper-lore-collection/hearts-and-flowers",
  esoBookId: 772,
  bookIndex: 22,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
