import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const onThoseWhoKnowBaanDar = {
  id: "01a0d60b-2345-73f7-94b3-c3cba2db1059",
  type: "page-type/temper-lore-book",
  slug: "on-those-who-know-baan-dar",
  title: "On Those Who Know Baan Dar",
  collection: "temper-lore-collection/anequina-archives",
  esoBookId: 5590,
  bookIndex: 48,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
