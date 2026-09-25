import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const forgottenTome = {
  id: "01a0d5f4-07b7-773b-8dfd-0cfb3d229e89",
  type: "page-type/temper-lore-book",
  slug: "forgotten-tome",
  title: "Forgotten Tome",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 120,
  bookIndex: 1,
  charted: true,
  quest: 3916,
  positions: "jsonl",
} as const satisfies TemperLoreBook
