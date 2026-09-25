import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const dawnbreakDecree = {
  id: "01a0d5f2-83a2-75df-af74-21485eb7b1c8",
  type: "page-type/temper-lore-book",
  slug: "dawnbreak-decree",
  title: "Dawnbreak Decree",
  collection: "temper-lore-collection/handbills-posters-and-decrees",
  esoBookId: 927,
  bookIndex: 35,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
