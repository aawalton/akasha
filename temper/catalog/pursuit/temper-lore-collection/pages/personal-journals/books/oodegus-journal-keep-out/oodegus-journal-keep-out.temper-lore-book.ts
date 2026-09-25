import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const oodegusJournalKeepOut = {
  id: "01a0d5f4-6f1b-7141-b49c-a66ca36103af",
  type: "page-type/temper-lore-book",
  slug: "oodegus-journal-keep-out",
  title: "Oodegu's Journal—Keep Out!",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 2940,
  bookIndex: 97,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
