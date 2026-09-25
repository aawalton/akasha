import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const warningIHeardYou = {
  id: "01a0d5f1-f452-7411-bc02-9ef845c5fe74",
  type: "page-type/temper-lore-book",
  slug: "warning-i-heard-you",
  title: "Warning: I Heard You!",
  collection: "temper-lore-collection/criminal-correspondence",
  esoBookId: 688,
  bookIndex: 26,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
