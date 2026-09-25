import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const fool = {
  id: "01a0d5f1-f451-77a3-9104-dcfc4699b487",
  type: "page-type/temper-lore-book",
  slug: "fool",
  title: "Fool!",
  collection: "temper-lore-collection/criminal-correspondence",
  esoBookId: 2529,
  bookIndex: 84,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
