import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const watchtowerLedger = {
  id: "01a0d5f4-07b9-760a-92fb-88776126a49d",
  type: "page-type/temper-lore-book",
  slug: "watchtower-ledger",
  title: "Watchtower Ledger",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 321,
  bookIndex: 2,
  charted: true,
  positions: "jsonl",
  createdAt: "2026-09-25T00:25:34.905Z",
  updatedAt: "2026-09-25T00:25:37.000Z",
} as const satisfies TemperLoreBook
