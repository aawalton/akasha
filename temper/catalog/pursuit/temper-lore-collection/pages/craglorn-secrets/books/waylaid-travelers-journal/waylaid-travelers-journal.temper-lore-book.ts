import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const waylaidTravelersJournal = {
  id: "01a0d5f1-c91c-79f2-9dcc-d9a6e28f6a91",
  type: "page-type/temper-lore-book",
  slug: "waylaid-travelers-journal",
  title: "Waylaid Traveler's Journal",
  collection: "temper-lore-collection/craglorn-secrets",
  esoBookId: 2619,
  bookIndex: 46,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
