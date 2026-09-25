import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToImedril = {
  id: "01a0d60a-d5bd-7cc2-94cc-d73a85f2f4ca",
  type: "page-type/temper-lore-book",
  slug: "letter-to-imedril",
  title: "Letter to Imedril",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 4869,
  bookIndex: 39,
  charted: true,
  quest: 6142,
  positions: "jsonl",
} as const satisfies TemperLoreBook
