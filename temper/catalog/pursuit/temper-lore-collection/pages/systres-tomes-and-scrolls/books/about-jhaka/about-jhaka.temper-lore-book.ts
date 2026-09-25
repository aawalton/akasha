import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aboutJhaka = {
  id: "01a0d60c-75b4-78d0-b09b-9c17db68bd8f",
  type: "page-type/temper-lore-book",
  slug: "about-jhaka",
  title: "About Jhaka",
  collection: "temper-lore-collection/systres-tomes-and-scrolls",
  esoBookId: 7157,
  bookIndex: 77,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
