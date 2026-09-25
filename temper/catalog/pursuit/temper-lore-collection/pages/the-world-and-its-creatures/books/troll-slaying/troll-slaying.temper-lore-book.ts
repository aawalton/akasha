import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const trollSlaying = {
  id: "01a0d5f5-f3e5-7e6c-a61e-780dc002b772",
  type: "page-type/temper-lore-book",
  slug: "troll-slaying",
  title: "Troll Slaying",
  collection: "temper-lore-collection/the-world-and-its-creatures",
  esoBookId: 1818,
  bookIndex: 45,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
