import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theLawOfGears = {
  id: "01a0d60a-a214-7381-8d98-977c1b4a699a",
  type: "page-type/temper-lore-book",
  slug: "the-law-of-gears",
  title: "The Law of Gears",
  collection: "temper-lore-collection/clockwork-mnemonix",
  esoBookId: 4695,
  bookIndex: 18,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
