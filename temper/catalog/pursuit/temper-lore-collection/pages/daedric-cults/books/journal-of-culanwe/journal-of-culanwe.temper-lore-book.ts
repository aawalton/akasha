import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const journalOfCulanwe = {
  id: "01a0d5f2-253b-7e42-b8c1-a4c8c5122ddf",
  type: "page-type/temper-lore-book",
  slug: "journal-of-culanwe",
  title: "Journal of Culanwe",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 2135,
  bookIndex: 73,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
