import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theRuddyFangs = {
  id: "01a0d60b-2346-7519-9736-1bbd60b7ecfe",
  type: "page-type/temper-lore-book",
  slug: "the-ruddy-fangs",
  title: "The Ruddy Fangs",
  collection: "temper-lore-collection/anequina-archives",
  esoBookId: 5589,
  bookIndex: 78,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
