import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theUnholyTemple = {
  id: "01a0d5f5-abbb-7a5c-b743-cd2c00a047ea",
  type: "page-type/temper-lore-book",
  slug: "the-unholy-temple",
  title: "The Unholy Temple",
  collection: "temper-lore-collection/the-devoted-and-the-deranged",
  esoBookId: 2042,
  bookIndex: 65,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
