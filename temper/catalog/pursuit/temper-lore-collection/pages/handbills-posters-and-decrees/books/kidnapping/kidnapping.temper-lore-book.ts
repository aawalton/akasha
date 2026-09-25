import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const kidnapping = {
  id: "01a0d5f2-83a2-7f70-94fc-98c7fe91eabd",
  type: "page-type/temper-lore-book",
  slug: "kidnapping",
  title: "KIDNAPPING!",
  collection: "temper-lore-collection/handbills-posters-and-decrees",
  esoBookId: 301,
  bookIndex: 3,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
