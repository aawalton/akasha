import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const karnwastenTemporalTome = {
  id: "01a0d60d-d471-78f7-9adc-15e5bcf87a74",
  type: "page-type/temper-lore-book",
  slug: "karnwasten-temporal-tome",
  title: "Karnwasten Temporal Tome",
  collection: "temper-lore-collection/elusive-manuscripts",
  esoBookId: 8412,
  bookIndex: 4,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
