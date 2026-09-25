import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const freeTheCaged = {
  id: "01a0d60e-687e-7fb9-be37-bfe6b55999db",
  type: "page-type/temper-lore-book",
  slug: "free-the-caged",
  title: "Free the Caged",
  collection: "temper-lore-collection/night-market-miscellanea",
  esoBookId: 8675,
  bookIndex: 6,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
