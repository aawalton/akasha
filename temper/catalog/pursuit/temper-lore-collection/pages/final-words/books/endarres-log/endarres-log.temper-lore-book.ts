import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const endarresLog = {
  id: "01a0d5f6-45ad-7904-aefa-2bbd883db192",
  type: "page-type/temper-lore-book",
  slug: "endarres-log",
  title: "Endarre's Log",
  collection: "temper-lore-collection/final-words",
  esoBookId: 1067,
  bookIndex: 22,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
