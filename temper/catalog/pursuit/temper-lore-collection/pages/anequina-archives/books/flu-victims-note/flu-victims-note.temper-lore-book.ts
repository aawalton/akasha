import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const fluVictimsNote = {
  id: "01a0d60b-2344-754f-8ac1-65b80d68ee62",
  type: "page-type/temper-lore-book",
  slug: "flu-victims-note",
  title: "Flu Victim's Note",
  collection: "temper-lore-collection/anequina-archives",
  esoBookId: 5467,
  bookIndex: 8,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
