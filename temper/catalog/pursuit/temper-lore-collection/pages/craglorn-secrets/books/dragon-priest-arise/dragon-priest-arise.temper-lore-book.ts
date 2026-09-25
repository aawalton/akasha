import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const dragonPriestArise = {
  id: "01a0d5f1-c91a-7e9d-839a-3a0f27a883d1",
  type: "page-type/temper-lore-book",
  slug: "dragon-priest-arise",
  title: "Dragon Priest—Arise!",
  collection: "temper-lore-collection/craglorn-secrets",
  esoBookId: 2702,
  bookIndex: 85,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
