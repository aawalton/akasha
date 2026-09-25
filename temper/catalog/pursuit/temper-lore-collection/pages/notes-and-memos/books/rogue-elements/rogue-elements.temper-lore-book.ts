import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const rogueElements = {
  id: "01a0d5f4-3c13-7e22-914a-f75effa5ba70",
  type: "page-type/temper-lore-book",
  slug: "rogue-elements",
  title: "Rogue Elements",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 1316,
  bookIndex: 31,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
