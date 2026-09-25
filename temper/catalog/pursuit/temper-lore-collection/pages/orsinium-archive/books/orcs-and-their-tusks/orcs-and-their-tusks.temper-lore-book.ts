import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const orcsAndTheirTusks = {
  id: "01a0d5f7-160b-7419-adcb-213d50add17f",
  type: "page-type/temper-lore-book",
  slug: "orcs-and-their-tusks",
  title: "Orcs and Their Tusks",
  collection: "temper-lore-collection/orsinium-archive",
  esoBookId: 3210,
  bookIndex: 1,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
