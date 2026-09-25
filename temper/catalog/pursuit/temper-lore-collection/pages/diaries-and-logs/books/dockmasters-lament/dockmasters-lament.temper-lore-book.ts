import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const dockmastersLament = {
  id: "01a0d5f2-509e-7513-82c6-d417d542abe0",
  type: "page-type/temper-lore-book",
  slug: "dockmasters-lament",
  title: "Dockmaster's Lament",
  collection: "temper-lore-collection/diaries-and-logs",
  esoBookId: 1742,
  bookIndex: 47,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
