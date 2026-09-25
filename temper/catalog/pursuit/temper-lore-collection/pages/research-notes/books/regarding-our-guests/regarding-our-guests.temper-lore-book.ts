import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const regardingOurGuests = {
  id: "01a0d5f5-1385-7946-8b0e-947a90bbf269",
  type: "page-type/temper-lore-book",
  slug: "regarding-our-guests",
  title: "Regarding Our Guests",
  collection: "temper-lore-collection/research-notes",
  esoBookId: 5956,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
