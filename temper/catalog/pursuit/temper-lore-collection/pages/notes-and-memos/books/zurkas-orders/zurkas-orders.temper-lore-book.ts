import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const zurkasOrders = {
  id: "01a0d5f4-3c13-7331-b5a2-a2c62696795a",
  type: "page-type/temper-lore-book",
  slug: "zurkas-orders",
  title: "Zurka's Orders",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 1555,
  bookIndex: 43,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
