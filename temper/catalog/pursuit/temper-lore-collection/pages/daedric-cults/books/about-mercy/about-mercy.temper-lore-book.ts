import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aboutMercy = {
  id: "01a0d5f2-253a-7fb6-b7cb-5f615d690dbc",
  type: "page-type/temper-lore-book",
  slug: "about-mercy",
  title: "About Mercy",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 612,
  bookIndex: 19,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
