import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToRana = {
  id: "01a0d5f3-7053-7dcc-9126-1ad00ed8c95c",
  type: "page-type/temper-lore-book",
  slug: "letter-to-rana",
  title: "Letter to Rana",
  collection: "temper-lore-collection/military-orders-and-reports",
  esoBookId: 342,
  bookIndex: 16,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
