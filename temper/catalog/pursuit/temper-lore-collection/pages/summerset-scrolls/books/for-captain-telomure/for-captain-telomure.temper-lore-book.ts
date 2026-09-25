import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const forCaptainTelomure = {
  id: "01a0d60a-d5bc-758c-ac74-9c3fa50ec4d5",
  type: "page-type/temper-lore-book",
  slug: "for-captain-telomure",
  title: "For Captain Telomure",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 4880,
  bookIndex: 80,
  charted: true,
  quest: 6144,
  positions: "jsonl",
} as const satisfies TemperLoreBook
