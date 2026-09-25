import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const missiveFromGrandInquisitorArsalan = {
  id: "01a0d60d-bbe4-7bfe-a02a-cd3a57cbe356",
  type: "page-type/temper-lore-book",
  slug: "missive-from-grand-inquisitor-arsalan",
  title: "Missive from Grand Inquisitor Arsalan",
  collection: "temper-lore-collection/companions-correspondence",
  esoBookId: 8006,
  bookIndex: 3,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
