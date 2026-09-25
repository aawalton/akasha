import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToTelenger = {
  id: "01a0d5f3-0ef8-7974-bc1f-4c839f42b23b",
  type: "page-type/temper-lore-book",
  slug: "letter-to-telenger",
  title: "Letter to Telenger",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 637,
  bookIndex: 14,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
