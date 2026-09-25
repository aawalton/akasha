import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theNycoticCult = {
  id: "01a0d5f7-aa9a-71e9-ba4c-29270aae4ed3",
  type: "page-type/temper-lore-book",
  slug: "the-nycotic-cult",
  title: "The Nycotic Cult",
  collection: "temper-lore-collection/vvardenfell-volumes",
  esoBookId: 4548,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
