import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const darkElvesDarkHearts = {
  id: "01a0d5f7-aa98-7ea3-8d40-6fe0e3392d28",
  type: "page-type/temper-lore-book",
  slug: "dark-elves-dark-hearts",
  title: "Dark Elves, Dark Hearts",
  collection: "temper-lore-collection/vvardenfell-volumes",
  esoBookId: 4039,
  bookIndex: 76,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
