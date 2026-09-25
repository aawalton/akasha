import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const welcomeInitiates = {
  id: "01a0d60c-baf4-7dc8-a12f-a6f79aebdb7e",
  type: "page-type/temper-lore-book",
  slug: "welcome-initiates",
  title: "Welcome, Initiates!",
  collection: "temper-lore-collection/archipelago-books-and-almanacs",
  esoBookId: 7286,
  bookIndex: 5,
  charted: true,
  quest: 6847,
  positions: "jsonl",
} as const satisfies TemperLoreBook
