import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const anthologyOfAvailableAbodes = {
  id: "01a0d5f2-83a2-7155-b4f1-14d151a01110",
  type: "page-type/temper-lore-book",
  slug: "anthology-of-available-abodes",
  title: "Anthology of Available Abodes",
  collection: "temper-lore-collection/handbills-posters-and-decrees",
  esoBookId: 4431,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
