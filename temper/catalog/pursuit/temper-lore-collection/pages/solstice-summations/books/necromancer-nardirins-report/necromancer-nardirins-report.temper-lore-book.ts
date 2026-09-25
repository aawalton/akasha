import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const necromancerNardirinsReport = {
  id: "01a0d60d-ff6a-783a-a250-2839ff2c653e",
  type: "page-type/temper-lore-book",
  slug: "necromancer-nardirins-report",
  title: "Necromancer Nardirin's Report",
  collection: "temper-lore-collection/solstice-summations",
  esoBookId: 8461,
  bookIndex: 9,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
