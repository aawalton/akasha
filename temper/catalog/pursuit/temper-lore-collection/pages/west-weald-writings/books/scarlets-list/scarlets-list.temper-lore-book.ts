import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const scarletsList = {
  id: "01a0d60d-4ab0-714e-b5f2-a9526e7029d9",
  type: "page-type/temper-lore-book",
  slug: "scarlets-list",
  title: "Scarlets List",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 8101,
  bookIndex: 91,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
