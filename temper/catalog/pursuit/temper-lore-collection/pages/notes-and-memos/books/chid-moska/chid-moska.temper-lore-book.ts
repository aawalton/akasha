import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const chidMoska = {
  id: "01a0d5f4-3c11-7b99-815f-0eda2b4790fb",
  type: "page-type/temper-lore-book",
  slug: "chid-moska",
  title: "Chid Moska",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 1327,
  bookIndex: 35,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
