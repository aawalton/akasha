import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const noteFromKhezulisContact = {
  id: "01a0d5f1-f451-73e4-b7f1-f240d5aed75b",
  type: "page-type/temper-lore-book",
  slug: "note-from-khezulis-contact",
  title: "Note from Khezuli's Contact",
  collection: "temper-lore-collection/criminal-correspondence",
  esoBookId: 947,
  bookIndex: 29,
  charted: true,
  quest: 4405,
  positions: "jsonl",
} as const satisfies TemperLoreBook
