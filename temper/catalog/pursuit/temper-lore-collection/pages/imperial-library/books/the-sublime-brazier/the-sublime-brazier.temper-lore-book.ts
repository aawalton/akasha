import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theSublimeBrazier = {
  id: "01a0d5f6-f385-7736-8d8f-53fff492e740",
  type: "page-type/temper-lore-book",
  slug: "the-sublime-brazier",
  title: "The Sublime Brazier",
  collection: "temper-lore-collection/imperial-library",
  esoBookId: 3082,
  bookIndex: 20,
  charted: true,
  quest: 5490,
  positions: "jsonl",
} as const satisfies TemperLoreBook
