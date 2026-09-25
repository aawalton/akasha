import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const shroudHearthBarrowTemporalTome = {
  id: "01a0d60d-d471-734a-9237-2c59b109a131",
  type: "page-type/temper-lore-book",
  slug: "shroud-hearth-barrow-temporal-tome",
  title: "Shroud Hearth Barrow Temporal Tome",
  collection: "temper-lore-collection/elusive-manuscripts",
  esoBookId: 8470,
  bookIndex: 8,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
