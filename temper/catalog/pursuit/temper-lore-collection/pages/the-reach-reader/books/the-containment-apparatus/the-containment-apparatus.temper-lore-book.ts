import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theContainmentApparatus = {
  id: "01a0d60b-c958-714a-a6f6-03f62d13c824",
  type: "page-type/temper-lore-book",
  slug: "the-containment-apparatus",
  title: "The Containment Apparatus",
  collection: "temper-lore-collection/the-reach-reader",
  esoBookId: 6366,
  bookIndex: 24,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
