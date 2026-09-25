import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const reportFromCaptainBrivan = {
  id: "01a0d5f7-aa99-7fb9-b149-bf6aaedcfa72",
  type: "page-type/temper-lore-book",
  slug: "report-from-captain-brivan",
  title: "Report From Captain Brivan",
  collection: "temper-lore-collection/vvardenfell-volumes",
  esoBookId: 4064,
  bookIndex: 79,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
