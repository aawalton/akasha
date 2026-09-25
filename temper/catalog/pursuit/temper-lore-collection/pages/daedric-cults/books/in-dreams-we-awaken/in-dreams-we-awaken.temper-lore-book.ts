import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const inDreamsWeAwaken = {
  id: "01a0d5f2-253a-7aea-acc0-8ccc1853803d",
  type: "page-type/temper-lore-book",
  slug: "in-dreams-we-awaken",
  title: "In Dreams We Awaken",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 1221,
  bookIndex: 45,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
