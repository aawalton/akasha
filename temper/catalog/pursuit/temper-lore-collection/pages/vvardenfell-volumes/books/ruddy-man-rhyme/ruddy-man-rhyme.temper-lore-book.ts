import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ruddyManRhyme = {
  id: "01a0d5f7-aa99-7b9f-ad58-10a04d2a67ea",
  type: "page-type/temper-lore-book",
  slug: "ruddy-man-rhyme",
  title: "Ruddy Man Rhyme",
  collection: "temper-lore-collection/vvardenfell-volumes",
  esoBookId: 4534,
  bookIndex: 59,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
