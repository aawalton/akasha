import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const coralAerieTemporalTome = {
  id: "01a0d60d-d471-7895-867e-c8d59e1269d5",
  type: "page-type/temper-lore-book",
  slug: "coral-aerie-temporal-tome",
  title: "Coral Aerie Temporal Tome",
  collection: "temper-lore-collection/elusive-manuscripts",
  esoBookId: 8410,
  bookIndex: 2,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
