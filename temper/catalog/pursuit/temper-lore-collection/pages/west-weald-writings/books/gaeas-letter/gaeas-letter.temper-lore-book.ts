import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const gaeasLetter = {
  id: "01a0d60d-4aaf-7302-94b2-ae5af8b7ed3b",
  type: "page-type/temper-lore-book",
  slug: "gaeas-letter",
  title: "Gaea's Letter",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 8125,
  bookIndex: 85,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
