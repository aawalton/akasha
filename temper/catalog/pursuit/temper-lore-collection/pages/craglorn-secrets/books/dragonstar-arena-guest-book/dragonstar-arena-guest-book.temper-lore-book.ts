import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const dragonstarArenaGuestBook = {
  id: "01a0d5f1-c91a-73ae-b2c3-65399ca19151",
  type: "page-type/temper-lore-book",
  slug: "dragonstar-arena-guest-book",
  title: "Dragonstar Arena Guest Book",
  collection: "temper-lore-collection/craglorn-secrets",
  esoBookId: 2745,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
