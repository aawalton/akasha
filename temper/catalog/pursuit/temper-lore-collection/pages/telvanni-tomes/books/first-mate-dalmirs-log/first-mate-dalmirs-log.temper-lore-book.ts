import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const firstMateDalmirsLog = {
  id: "01a0d60c-eb9b-7176-bc28-b60630d24218",
  type: "page-type/temper-lore-book",
  slug: "first-mate-dalmirs-log",
  title: "First Mate Dalmir's Log",
  collection: "temper-lore-collection/telvanni-tomes",
  esoBookId: 7543,
  bookIndex: 4,
  charted: true,
  quest: 6971,
  positions: "jsonl",
} as const satisfies TemperLoreBook
