import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const siltStriderStation = {
  id: "01a0d5f2-83a3-7529-8bd7-464c02437395",
  type: "page-type/temper-lore-book",
  slug: "silt-strider-station",
  title: "Silt-Strider Station",
  collection: "temper-lore-collection/handbills-posters-and-decrees",
  esoBookId: 4571,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
