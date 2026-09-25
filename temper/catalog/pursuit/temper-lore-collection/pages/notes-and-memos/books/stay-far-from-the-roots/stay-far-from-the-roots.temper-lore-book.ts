import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const stayFarFromTheRoots = {
  id: "01a0d5f4-3c13-7761-80a0-292d0e7f3e53",
  type: "page-type/temper-lore-book",
  slug: "stay-far-from-the-roots",
  title: "Stay Far from the Roots",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 1319,
  bookIndex: 32,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
