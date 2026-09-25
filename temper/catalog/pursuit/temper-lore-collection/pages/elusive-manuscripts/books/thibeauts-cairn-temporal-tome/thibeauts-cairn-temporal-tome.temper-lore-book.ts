import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const thibeautsCairnTemporalTome = {
  id: "01a0d60d-d472-75ad-b418-b2a9c9e57cb5",
  type: "page-type/temper-lore-book",
  slug: "thibeauts-cairn-temporal-tome",
  title: "Thibeaut's Cairn Temporal Tome",
  collection: "temper-lore-collection/elusive-manuscripts",
  esoBookId: 8469,
  bookIndex: 7,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
