import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const kennixasList = {
  id: "01a0d5f5-abba-7cae-8131-7084a6d60a99",
  type: "page-type/temper-lore-book",
  slug: "kennixas-list",
  title: "Kennixa's List",
  collection: "temper-lore-collection/the-devoted-and-the-deranged",
  esoBookId: 127,
  bookIndex: 6,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
