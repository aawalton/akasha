import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const urcelmosSupplementalOrders = {
  id: "01a0d5f3-7054-7559-a5cd-9b4f5f7ac013",
  type: "page-type/temper-lore-book",
  slug: "urcelmos-supplemental-orders",
  title: "Urcelmo's Supplemental Orders",
  collection: "temper-lore-collection/military-orders-and-reports",
  esoBookId: 873,
  bookIndex: 36,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
