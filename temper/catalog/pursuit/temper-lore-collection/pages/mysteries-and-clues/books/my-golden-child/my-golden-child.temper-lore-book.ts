import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const myGoldenChild = {
  id: "01a0d5f4-07b8-7485-8749-e91a1756fb78",
  type: "page-type/temper-lore-book",
  slug: "my-golden-child",
  title: "My Golden Child",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 4055,
  bookIndex: 72,
  charted: true,
  quest: 5920,
  positions: "jsonl",
} as const satisfies TemperLoreBook
