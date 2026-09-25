import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const mineSafetyRegulations = {
  id: "01a0d5f2-83a2-7f04-86d7-873ec41aba64",
  type: "page-type/temper-lore-book",
  slug: "mine-safety-regulations",
  title: "Mine Safety Regulations",
  collection: "temper-lore-collection/handbills-posters-and-decrees",
  esoBookId: 1026,
  bookIndex: 37,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
