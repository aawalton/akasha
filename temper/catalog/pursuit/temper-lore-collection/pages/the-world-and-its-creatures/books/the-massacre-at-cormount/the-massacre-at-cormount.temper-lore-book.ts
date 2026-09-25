import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theMassacreAtCormount = {
  id: "01a0d5f5-f3e5-7114-beb6-244d5b2ea487",
  type: "page-type/temper-lore-book",
  slug: "the-massacre-at-cormount",
  title: "The Massacre at Cormount",
  collection: "temper-lore-collection/the-world-and-its-creatures",
  esoBookId: 2115,
  bookIndex: 56,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
