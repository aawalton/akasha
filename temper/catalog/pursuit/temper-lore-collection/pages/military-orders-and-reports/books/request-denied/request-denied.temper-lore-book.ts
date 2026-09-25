import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const requestDenied = {
  id: "01a0d5f3-7054-7471-9183-f3713af70381",
  type: "page-type/temper-lore-book",
  slug: "request-denied",
  title: "Request Denied",
  collection: "temper-lore-collection/military-orders-and-reports",
  esoBookId: 1367,
  bookIndex: 54,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
