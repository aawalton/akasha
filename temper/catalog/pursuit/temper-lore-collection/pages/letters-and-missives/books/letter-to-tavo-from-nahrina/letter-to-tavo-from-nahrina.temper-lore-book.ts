import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToTavoFromNahrina = {
  id: "01a0d5f3-0ef8-7cfa-aaf8-e122548db724",
  type: "page-type/temper-lore-book",
  slug: "letter-to-tavo-from-nahrina",
  title: "Letter to Tavo from Nahrina",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 128,
  bookIndex: 3,
  charted: true,
  quest: 3970,
  positions: "jsonl",
} as const satisfies TemperLoreBook
