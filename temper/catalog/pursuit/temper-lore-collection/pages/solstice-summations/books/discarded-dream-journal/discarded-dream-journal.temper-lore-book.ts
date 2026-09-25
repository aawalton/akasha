import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const discardedDreamJournal = {
  id: "01a0d60d-ff69-7bc3-a49c-dfca1b9f593f",
  type: "page-type/temper-lore-book",
  slug: "discarded-dream-journal",
  title: "Discarded Dream Journal",
  collection: "temper-lore-collection/solstice-summations",
  esoBookId: 8516,
  bookIndex: 68,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
