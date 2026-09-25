import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const redRookOrdersCryptwatch = {
  id: "01a0d5f1-f451-70bf-9f3b-397b7c133280",
  type: "page-type/temper-lore-book",
  slug: "red-rook-orders-cryptwatch",
  title: "Red Rook Orders: Cryptwatch",
  collection: "temper-lore-collection/criminal-correspondence",
  esoBookId: 87,
  bookIndex: 3,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
