import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const dameHeleniesQuest = {
  id: "01a0d60c-baf3-7fc6-8c5d-d4e2b4976213",
  type: "page-type/temper-lore-book",
  slug: "dame-helenies-quest",
  title: "Dame Helenie's Quest",
  collection: "temper-lore-collection/archipelago-books-and-almanacs",
  esoBookId: 7573,
  bookIndex: 66,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
