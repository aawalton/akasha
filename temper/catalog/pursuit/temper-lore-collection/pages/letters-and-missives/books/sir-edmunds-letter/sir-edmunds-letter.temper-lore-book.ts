import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const sirEdmundsLetter = {
  id: "01a0d5f3-0ef8-798c-b56e-4b81a0b6c816",
  type: "page-type/temper-lore-book",
  slug: "sir-edmunds-letter",
  title: "Sir Edmund's Letter",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 2537,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
