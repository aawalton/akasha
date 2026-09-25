import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const hammerOfGlass = {
  id: "01a0d5f6-d68a-7dfa-9bb8-f64b32fd3714",
  type: "page-type/temper-lore-book",
  slug: "hammer-of-glass",
  title: "Hammer of Glass",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 3127,
  bookIndex: 74,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
