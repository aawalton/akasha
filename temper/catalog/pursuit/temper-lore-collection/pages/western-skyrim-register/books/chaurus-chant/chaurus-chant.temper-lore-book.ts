import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const chaurusChant = {
  id: "01a0d60b-a361-75e5-abb4-b5ff8b78b485",
  type: "page-type/temper-lore-book",
  slug: "chaurus-chant",
  title: "Chaurus Chant",
  collection: "temper-lore-collection/western-skyrim-register",
  esoBookId: 6049,
  bookIndex: 19,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
