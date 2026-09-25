import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const bridgeGuardsComplaint = {
  id: "01a0d5f3-7052-70c4-888a-32b32287db9c",
  type: "page-type/temper-lore-book",
  slug: "bridge-guards-complaint",
  title: "Bridge Guard's Complaint",
  collection: "temper-lore-collection/military-orders-and-reports",
  esoBookId: 887,
  bookIndex: 38,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
