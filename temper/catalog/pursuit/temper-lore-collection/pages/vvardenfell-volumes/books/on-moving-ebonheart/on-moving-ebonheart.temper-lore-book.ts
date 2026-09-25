import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const onMovingEbonheart = {
  id: "01a0d5f7-aa99-7cea-a8a8-39222b8ec70e",
  type: "page-type/temper-lore-book",
  slug: "on-moving-ebonheart",
  title: "On Moving Ebonheart",
  collection: "temper-lore-collection/vvardenfell-volumes",
  esoBookId: 4432,
  bookIndex: 25,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
