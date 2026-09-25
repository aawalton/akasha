import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const unfinishedScroll = {
  id: "01a0d5f4-3c13-7094-9f98-9ba39f5a5a51",
  type: "page-type/temper-lore-book",
  slug: "unfinished-scroll",
  title: "Unfinished Scroll",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 1218,
  bookIndex: 27,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
