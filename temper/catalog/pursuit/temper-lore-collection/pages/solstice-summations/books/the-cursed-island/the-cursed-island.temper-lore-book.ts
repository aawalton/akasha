import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theCursedIsland = {
  id: "01a0d60d-ff6a-7a6a-9837-bf7329469039",
  type: "page-type/temper-lore-book",
  slug: "the-cursed-island",
  title: "The Cursed Island",
  collection: "temper-lore-collection/solstice-summations",
  esoBookId: 8452,
  bookIndex: 56,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
