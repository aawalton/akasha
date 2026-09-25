import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const flyleafCatacombs = {
  id: "01a0d5f1-f451-7614-a57b-e29d823034d0",
  type: "page-type/temper-lore-book",
  slug: "flyleaf-catacombs",
  title: "Flyleaf Catacombs",
  collection: "temper-lore-collection/criminal-correspondence",
  esoBookId: 95,
  bookIndex: 4,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
