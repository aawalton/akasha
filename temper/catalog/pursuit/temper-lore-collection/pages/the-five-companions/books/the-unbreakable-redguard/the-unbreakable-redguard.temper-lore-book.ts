import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theUnbreakableRedguard = {
  id: "01a0d5f5-c96e-7901-9a44-96fbcb678495",
  type: "page-type/temper-lore-book",
  slug: "the-unbreakable-redguard",
  title: "The Unbreakable Redguard",
  collection: "temper-lore-collection/the-five-companions",
  esoBookId: 1618,
  bookIndex: 6,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
