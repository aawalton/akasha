import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const thePackOfArchonsGrove = {
  id: "01a0d60a-d5be-7ce4-939d-09b137cc9d12",
  type: "page-type/temper-lore-book",
  slug: "the-pack-of-archons-grove",
  title: "The Pack of Archon's Grove",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 5096,
  bookIndex: 59,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
