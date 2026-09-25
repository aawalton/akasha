import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const weWillBeSpared = {
  id: "01a0d5f4-3c13-7d8b-adb0-480db84f0695",
  type: "page-type/temper-lore-book",
  slug: "we-will-be-spared",
  title: "We Will Be Spared",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 1959,
  bookIndex: 73,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
