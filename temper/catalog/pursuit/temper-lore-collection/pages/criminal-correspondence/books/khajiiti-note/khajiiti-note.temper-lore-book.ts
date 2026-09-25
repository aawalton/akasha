import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const khajiitiNote = {
  id: "01a0d5f1-f451-7dc3-8f04-7894c178b412",
  type: "page-type/temper-lore-book",
  slug: "khajiiti-note",
  title: "Khajiiti Note",
  collection: "temper-lore-collection/criminal-correspondence",
  esoBookId: 304,
  bookIndex: 8,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
