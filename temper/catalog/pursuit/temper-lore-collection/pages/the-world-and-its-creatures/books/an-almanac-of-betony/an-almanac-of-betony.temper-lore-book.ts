import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const anAlmanacOfBetony = {
  id: "01a0d5f5-f3e3-7de5-b51e-720a8751e5d3",
  type: "page-type/temper-lore-book",
  slug: "an-almanac-of-betony",
  title: "An Almanac of Betony",
  collection: "temper-lore-collection/the-world-and-its-creatures",
  esoBookId: 1358,
  bookIndex: 27,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
