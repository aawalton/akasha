import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const thereAreWays = {
  id: "01a0d5f2-253c-797e-9448-bae8caf74114",
  type: "page-type/temper-lore-book",
  slug: "there-are-ways",
  title: "There Are Ways",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 1049,
  bookIndex: 41,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
