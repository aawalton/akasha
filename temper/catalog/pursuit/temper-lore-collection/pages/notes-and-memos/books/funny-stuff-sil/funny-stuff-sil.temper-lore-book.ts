import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const funnyStuffSil = {
  id: "01a0d5f4-3c11-7d6e-977c-ef6a10fe0f4b",
  type: "page-type/temper-lore-book",
  slug: "funny-stuff-sil",
  title: "Funny Stuff, Sil",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 1604,
  bookIndex: 53,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
