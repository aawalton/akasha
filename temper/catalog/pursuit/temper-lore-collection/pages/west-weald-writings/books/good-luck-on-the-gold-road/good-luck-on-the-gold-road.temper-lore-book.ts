import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const goodLuckOnTheGoldRoad = {
  id: "01a0d60d-4aaf-71ec-8735-a9f789e831f0",
  type: "page-type/temper-lore-book",
  slug: "good-luck-on-the-gold-road",
  title: "Good Luck on the Gold Road",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 7878,
  bookIndex: 96,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
