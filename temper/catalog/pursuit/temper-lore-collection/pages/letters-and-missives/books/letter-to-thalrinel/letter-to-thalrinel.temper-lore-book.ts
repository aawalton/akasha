import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToThalrinel = {
  id: "01a0d5f3-0ef8-7170-8c04-ff800ebd40d3",
  type: "page-type/temper-lore-book",
  slug: "letter-to-thalrinel",
  title: "Letter to Thalrinel",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 1289,
  bookIndex: 44,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
