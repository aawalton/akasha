import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const agraCrun = {
  id: "01a0d5f6-d68a-79ef-9c9f-943d79f724c6",
  type: "page-type/temper-lore-book",
  slug: "agra-crun",
  title: "Agra Crun",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 3112,
  bookIndex: 41,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
