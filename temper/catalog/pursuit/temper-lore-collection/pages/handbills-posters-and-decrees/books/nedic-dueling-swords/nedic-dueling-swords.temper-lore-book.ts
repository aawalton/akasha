import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const nedicDuelingSwords = {
  id: "01a0d5f2-83a2-7443-accc-1f305665713f",
  type: "page-type/temper-lore-book",
  slug: "nedic-dueling-swords",
  title: "Nedic Dueling Swords",
  collection: "temper-lore-collection/handbills-posters-and-decrees",
  esoBookId: 1306,
  bookIndex: 55,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
