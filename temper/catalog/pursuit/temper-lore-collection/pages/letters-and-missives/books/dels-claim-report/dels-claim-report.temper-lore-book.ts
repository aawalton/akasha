import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const delsClaimReport = {
  id: "01a0d5f3-0ef7-7deb-9152-be1588c8e681",
  type: "page-type/temper-lore-book",
  slug: "dels-claim-report",
  title: "Del's Claim Report",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 1312,
  bookIndex: 48,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
