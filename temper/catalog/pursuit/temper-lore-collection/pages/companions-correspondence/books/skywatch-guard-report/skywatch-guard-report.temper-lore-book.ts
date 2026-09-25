import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const skywatchGuardReport = {
  id: "01a0d60d-bbe4-7c78-8406-42fb057e17a7",
  type: "page-type/temper-lore-book",
  slug: "skywatch-guard-report",
  title: "Skywatch Guard Report",
  collection: "temper-lore-collection/companions-correspondence",
  esoBookId: 8286,
  bookIndex: 12,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
