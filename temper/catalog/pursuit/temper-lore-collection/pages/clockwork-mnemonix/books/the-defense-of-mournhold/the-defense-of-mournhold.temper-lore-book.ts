import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theDefenseOfMournhold = {
  id: "01a0d60a-a214-7c0d-ac6f-847643424f5c",
  type: "page-type/temper-lore-book",
  slug: "the-defense-of-mournhold",
  title: "The Defense of Mournhold",
  collection: "temper-lore-collection/clockwork-mnemonix",
  esoBookId: 4799,
  bookIndex: 78,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
