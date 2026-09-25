import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const anExPirate = {
  id: "01a0d60e-45b2-7bc3-b0ad-08c15642134e",
  type: "page-type/temper-lore-book",
  slug: "an-ex-pirate",
  title: "An Ex-Pirate",
  collection: "temper-lore-collection/solstice-summations-part-2",
  esoBookId: 8454,
  bookIndex: 43,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
