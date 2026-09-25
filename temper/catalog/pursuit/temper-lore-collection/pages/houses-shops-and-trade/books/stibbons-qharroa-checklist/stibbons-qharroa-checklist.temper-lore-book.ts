import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const stibbonsQharroaChecklist = {
  id: "01a0d5f2-db26-7e54-817e-d4991974b975",
  type: "page-type/temper-lore-book",
  slug: "stibbons-qharroa-checklist",
  title: "Stibbons' Qharroa Checklist",
  collection: "temper-lore-collection/houses-shops-and-trade",
  esoBookId: 1891,
  bookIndex: 70,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
