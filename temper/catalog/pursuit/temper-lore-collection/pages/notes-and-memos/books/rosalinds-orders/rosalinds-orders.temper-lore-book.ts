import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const rosalindsOrders = {
  id: "01a0d5f4-3c13-79c0-b0ae-820cafe8afa3",
  type: "page-type/temper-lore-book",
  slug: "rosalinds-orders",
  title: "Rosalind's Orders",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 1084,
  bookIndex: 25,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
