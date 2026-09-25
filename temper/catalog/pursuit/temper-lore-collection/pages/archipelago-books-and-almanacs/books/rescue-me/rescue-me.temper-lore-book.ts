import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const rescueMe = {
  id: "01a0d60c-baf3-7d0e-ad07-856052e3ef41",
  type: "page-type/temper-lore-book",
  slug: "rescue-me",
  title: "Rescue Me",
  collection: "temper-lore-collection/archipelago-books-and-almanacs",
  esoBookId: 7600,
  bookIndex: 72,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
