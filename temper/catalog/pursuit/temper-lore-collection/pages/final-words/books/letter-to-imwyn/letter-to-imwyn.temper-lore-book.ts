import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToImwyn = {
  id: "01a0d5f6-45ae-7be6-9ac1-d87f3491b7f7",
  type: "page-type/temper-lore-book",
  slug: "letter-to-imwyn",
  title: "Letter to Imwyn",
  collection: "temper-lore-collection/final-words",
  esoBookId: 485,
  bookIndex: 9,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
