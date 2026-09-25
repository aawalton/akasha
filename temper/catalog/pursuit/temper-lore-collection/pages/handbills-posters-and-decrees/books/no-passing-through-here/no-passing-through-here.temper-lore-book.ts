import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const noPassingThroughHere = {
  id: "01a0d5f2-83a2-7fbb-b344-10d943b537a3",
  type: "page-type/temper-lore-book",
  slug: "no-passing-through-here",
  title: "No Passing Through Here",
  collection: "temper-lore-collection/handbills-posters-and-decrees",
  esoBookId: 884,
  bookIndex: 33,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
