import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const mammothDuty = {
  id: "01a0d5f3-7053-7079-b08b-e256a1842d37",
  type: "page-type/temper-lore-book",
  slug: "mammoth-duty",
  title: "Mammoth Duty",
  collection: "temper-lore-collection/military-orders-and-reports",
  esoBookId: 534,
  bookIndex: 20,
  charted: true,
  quest: 4086,
  positions: "jsonl",
} as const satisfies TemperLoreBook
