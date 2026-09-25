import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const peopleIHate = {
  id: "01a0d5f4-3c12-7392-9d74-b9de7566bb67",
  type: "page-type/temper-lore-book",
  slug: "people-i-hate",
  title: "People I Hate",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 2996,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
