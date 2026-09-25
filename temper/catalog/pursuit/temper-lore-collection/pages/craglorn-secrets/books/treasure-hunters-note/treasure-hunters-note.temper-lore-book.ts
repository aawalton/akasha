import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const treasureHuntersNote = {
  id: "01a0d5f1-c91b-7d16-9d35-9813f62f1698",
  type: "page-type/temper-lore-book",
  slug: "treasure-hunters-note",
  title: "Treasure Hunter's Note",
  collection: "temper-lore-collection/craglorn-secrets",
  esoBookId: 2613,
  bookIndex: 41,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
