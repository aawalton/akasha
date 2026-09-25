import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const scrawledNoteToLorne = {
  id: "01a0d5f1-f451-714f-9a2a-2c56b6e9cd56",
  type: "page-type/temper-lore-book",
  slug: "scrawled-note-to-lorne",
  title: "Scrawled Note to Lorne",
  collection: "temper-lore-collection/criminal-correspondence",
  esoBookId: 4903,
  bookIndex: 94,
  charted: true,
  quest: 6135,
  positions: "jsonl",
} as const satisfies TemperLoreBook
