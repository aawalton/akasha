import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const toMyReviewer = {
  id: "01a0d5f3-0ef9-75ba-8145-121e1788a364",
  type: "page-type/temper-lore-book",
  slug: "to-my-reviewer",
  title: "To My Reviewer",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 903,
  bookIndex: 23,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
