import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theInescapableHelm = {
  id: "01a0d60a-f1ec-7220-9eda-4dd46d2a4180",
  type: "page-type/temper-lore-book",
  slug: "the-inescapable-helm",
  title: "The Inescapable Helm",
  collection: "temper-lore-collection/moawita-memories",
  esoBookId: 4824,
  bookIndex: 10,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
