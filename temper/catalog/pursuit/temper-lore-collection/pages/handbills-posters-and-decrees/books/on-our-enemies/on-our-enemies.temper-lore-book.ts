import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const onOurEnemies = {
  id: "01a0d5f2-83a3-7533-bd0e-8e27d7eaf984",
  type: "page-type/temper-lore-book",
  slug: "on-our-enemies",
  title: "On Our Enemies",
  collection: "temper-lore-collection/handbills-posters-and-decrees",
  esoBookId: 1273,
  bookIndex: 50,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
