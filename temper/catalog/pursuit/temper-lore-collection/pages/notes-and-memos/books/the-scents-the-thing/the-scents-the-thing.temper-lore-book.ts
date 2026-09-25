import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theScentsTheThing = {
  id: "01a0d5f4-3c13-7d97-8e40-42d1b7f8f33b",
  type: "page-type/temper-lore-book",
  slug: "the-scents-the-thing",
  title: "The Scent's the Thing",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 2359,
  bookIndex: 98,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
