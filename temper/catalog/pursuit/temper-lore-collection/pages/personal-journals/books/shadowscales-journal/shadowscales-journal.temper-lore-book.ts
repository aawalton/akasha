import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const shadowscalesJournal = {
  id: "01a0d5f4-6f1b-7743-9293-beb0a129c24a",
  type: "page-type/temper-lore-book",
  slug: "shadowscales-journal",
  title: "Shadowscale's Journal",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 1324,
  bookIndex: 58,
  charted: true,
  quest: 3686,
  positions: "jsonl",
} as const satisfies TemperLoreBook
