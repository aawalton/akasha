import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const journalOfKovanGiryon = {
  id: "01a0d5f8-02f8-7242-9250-c63144543a84",
  type: "page-type/temper-lore-book",
  slug: "journal-of-kovan-giryon",
  title: "Journal of Kovan Giryon",
  collection: "temper-lore-collection/library-of-incunabula",
  esoBookId: 7349,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
