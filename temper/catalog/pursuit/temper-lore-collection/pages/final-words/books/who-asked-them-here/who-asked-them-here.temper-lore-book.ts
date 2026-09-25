import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const whoAskedThemHere = {
  id: "01a0d5f6-45ae-77cc-bba5-390d0f87bd74",
  type: "page-type/temper-lore-book",
  slug: "who-asked-them-here",
  title: "Who Asked Them Here?",
  collection: "temper-lore-collection/final-words",
  esoBookId: 1636,
  bookIndex: 43,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
