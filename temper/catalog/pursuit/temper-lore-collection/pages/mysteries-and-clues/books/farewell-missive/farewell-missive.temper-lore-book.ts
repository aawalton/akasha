import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const farewellMissive = {
  id: "01a0d5f4-07b7-7364-92ee-fadac6ad19f3",
  type: "page-type/temper-lore-book",
  slug: "farewell-missive",
  title: "Farewell Missive",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 498,
  bookIndex: 10,
  charted: true,
  quest: 4212,
  positions: "jsonl",
} as const satisfies TemperLoreBook
