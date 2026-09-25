import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const octantsOfTheScrivener = {
  id: "01a0d5f8-02f9-787e-8071-d7073882fcd1",
  type: "page-type/temper-lore-book",
  slug: "octants-of-the-scrivener",
  title: "Octants of the Scrivener",
  collection: "temper-lore-collection/library-of-incunabula",
  esoBookId: 7472,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
