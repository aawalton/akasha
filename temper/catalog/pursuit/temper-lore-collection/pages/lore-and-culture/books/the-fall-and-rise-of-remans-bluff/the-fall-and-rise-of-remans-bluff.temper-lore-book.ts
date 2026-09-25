import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theFallAndRiseOfRemansBluff = {
  id: "01a0d5f3-3fdb-7133-948f-6a44435b855d",
  type: "page-type/temper-lore-book",
  slug: "the-fall-and-rise-of-remans-bluff",
  title: "The Fall and Rise of Reman's Bluff",
  collection: "temper-lore-collection/lore-and-culture",
  esoBookId: 2124,
  bookIndex: 90,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
