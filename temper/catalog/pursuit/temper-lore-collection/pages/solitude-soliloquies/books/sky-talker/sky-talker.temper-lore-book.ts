import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const skyTalker = {
  id: "01a0d60b-8109-7575-a9a2-f3994650950a",
  type: "page-type/temper-lore-book",
  slug: "sky-talker",
  title: "Sky-Talker",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 5910,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
