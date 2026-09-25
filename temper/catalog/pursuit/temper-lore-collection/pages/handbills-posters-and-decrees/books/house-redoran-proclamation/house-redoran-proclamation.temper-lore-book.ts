import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const houseRedoranProclamation = {
  id: "01a0d5f2-83a2-7060-8913-b653515764b5",
  type: "page-type/temper-lore-book",
  slug: "house-redoran-proclamation",
  title: "House Redoran Proclamation",
  collection: "temper-lore-collection/handbills-posters-and-decrees",
  esoBookId: 4015,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
