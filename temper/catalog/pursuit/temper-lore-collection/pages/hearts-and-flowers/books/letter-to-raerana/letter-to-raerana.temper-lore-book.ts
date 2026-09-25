import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToRaerana = {
  id: "01a0d5f2-af70-7f14-97a1-67e62f0ea78a",
  type: "page-type/temper-lore-book",
  slug: "letter-to-raerana",
  title: "Letter to Raerana",
  collection: "temper-lore-collection/hearts-and-flowers",
  esoBookId: 657,
  bookIndex: 18,
  charted: true,
  quest: 4289,
  positions: "jsonl",
} as const satisfies TemperLoreBook
