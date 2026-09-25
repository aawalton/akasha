import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const firebrandWatch = {
  id: "01a0d5f4-c383-75e7-bac4-defb368774e5",
  type: "page-type/temper-lore-book",
  slug: "firebrand-watch",
  title: "Firebrand Watch",
  collection: "temper-lore-collection/plots-and-schemes",
  esoBookId: 88,
  bookIndex: 1,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
