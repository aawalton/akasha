import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const liquidSilver = {
  id: "01a0d5f6-d68b-76da-84dc-514dba812d61",
  type: "page-type/temper-lore-book",
  slug: "liquid-silver",
  title: "Liquid Silver",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 3124,
  bookIndex: 73,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
