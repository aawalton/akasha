import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const inTheDeepTombs = {
  id: "01a0d60b-c958-770c-8291-2e8ce2eb3224",
  type: "page-type/temper-lore-book",
  slug: "in-the-deep-tombs",
  title: "In the Deep Tombs",
  collection: "temper-lore-collection/the-reach-reader",
  esoBookId: 6275,
  bookIndex: 1,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
