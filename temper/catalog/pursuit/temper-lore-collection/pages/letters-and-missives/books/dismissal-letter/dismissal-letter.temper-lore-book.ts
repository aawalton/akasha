import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const dismissalLetter = {
  id: "01a0d5f3-0ef7-7047-b00d-d935804424b1",
  type: "page-type/temper-lore-book",
  slug: "dismissal-letter",
  title: "Dismissal Letter",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 932,
  bookIndex: 24,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
