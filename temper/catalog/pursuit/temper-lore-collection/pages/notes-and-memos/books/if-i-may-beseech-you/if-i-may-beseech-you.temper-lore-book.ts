import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ifIMayBeseechYou = {
  id: "01a0d5f4-3c12-7e69-955b-a5261a9ead1c",
  type: "page-type/temper-lore-book",
  slug: "if-i-may-beseech-you",
  title: "If I May Beseech You",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 1593,
  bookIndex: 49,
  charted: true,
  quest: 4748,
  positions: "jsonl",
} as const satisfies TemperLoreBook
