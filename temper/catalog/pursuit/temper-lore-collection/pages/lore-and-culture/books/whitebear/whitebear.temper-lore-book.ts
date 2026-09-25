import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const whitebear = {
  id: "01a0d5f3-3fdc-76fb-93fe-3e870bf339e6",
  type: "page-type/temper-lore-book",
  slug: "whitebear",
  title: "Whitebear",
  collection: "temper-lore-collection/lore-and-culture",
  esoBookId: 1114,
  bookIndex: 35,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
