import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const captainLagrasLedger = {
  id: "01a0d5f1-f450-7655-a548-380be266bdac",
  type: "page-type/temper-lore-book",
  slug: "captain-lagras-ledger",
  title: "Captain Lagra's Ledger",
  collection: "temper-lore-collection/criminal-correspondence",
  esoBookId: 2470,
  bookIndex: 82,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
