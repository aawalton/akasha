import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const legendOfChillHouse = {
  id: "01a0d5f4-3c12-78ad-b9b7-03e2116a7798",
  type: "page-type/temper-lore-book",
  slug: "legend-of-chill-house",
  title: "Legend of Chill House",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 2457,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
