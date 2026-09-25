import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToRaelynne = {
  id: "01a0d5f3-0ef8-7496-b60a-365f0f765f1b",
  type: "page-type/temper-lore-book",
  slug: "letter-to-raelynne",
  title: "Letter to Raelynne",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 1939,
  bookIndex: 79,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
