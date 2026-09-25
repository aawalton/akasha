import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aToughAudience = {
  id: "01a0d5f4-3c11-7cda-809b-27cfd7811107",
  type: "page-type/temper-lore-book",
  slug: "a-tough-audience",
  title: "A Tough Audience",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 2235,
  bookIndex: 90,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
