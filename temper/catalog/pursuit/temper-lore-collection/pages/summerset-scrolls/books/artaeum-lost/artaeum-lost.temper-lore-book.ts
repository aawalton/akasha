import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const artaeumLost = {
  id: "01a0d60a-d5bc-75bd-bef4-ff8327f5ce30",
  type: "page-type/temper-lore-book",
  slug: "artaeum-lost",
  title: "Artaeum Lost",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 4854,
  bookIndex: 29,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
