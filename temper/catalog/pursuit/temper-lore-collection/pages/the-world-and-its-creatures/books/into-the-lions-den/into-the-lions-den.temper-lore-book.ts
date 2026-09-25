import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const intoTheLionsDen = {
  id: "01a0d5f5-f3e4-7527-8d9d-91155ebfa960",
  type: "page-type/temper-lore-book",
  slug: "into-the-lions-den",
  title: "Into the Lion's Den",
  collection: "temper-lore-collection/the-world-and-its-creatures",
  esoBookId: 888,
  bookIndex: 18,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
