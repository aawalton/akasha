import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const blackguardNote = {
  id: "01a0d5f4-07b7-7419-83ba-2c24366a38e2",
  type: "page-type/temper-lore-book",
  slug: "blackguard-note",
  title: "Blackguard Note",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 5193,
  bookIndex: 86,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
