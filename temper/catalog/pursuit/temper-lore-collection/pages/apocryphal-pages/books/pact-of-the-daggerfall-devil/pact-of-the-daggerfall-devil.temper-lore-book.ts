import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const pactOfTheDaggerfallDevil = {
  id: "01a0d60d-156e-743e-8ed4-a97fa874ed8d",
  type: "page-type/temper-lore-book",
  slug: "pact-of-the-daggerfall-devil",
  title: "Pact of the Daggerfall Devil",
  collection: "temper-lore-collection/apocryphal-pages",
  esoBookId: 7693,
  bookIndex: 59,
  charted: true,
  quest: 6995,
  positions: "jsonl",
} as const satisfies TemperLoreBook
