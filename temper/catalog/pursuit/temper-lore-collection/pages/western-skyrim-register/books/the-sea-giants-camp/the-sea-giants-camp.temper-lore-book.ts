import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theSeaGiantsCamp = {
  id: "01a0d60b-a362-7734-9202-fc1f83239c03",
  type: "page-type/temper-lore-book",
  slug: "the-sea-giants-camp",
  title: "The Sea Giant's Camp",
  collection: "temper-lore-collection/western-skyrim-register",
  esoBookId: 6034,
  bookIndex: 8,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
