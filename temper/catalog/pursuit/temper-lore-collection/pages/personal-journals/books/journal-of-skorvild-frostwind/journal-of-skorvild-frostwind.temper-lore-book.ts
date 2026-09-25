import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const journalOfSkorvildFrostwind = {
  id: "01a0d5f4-6f1a-7590-9f66-33b7d52d844d",
  type: "page-type/temper-lore-book",
  slug: "journal-of-skorvild-frostwind",
  title: "Journal of Skorvild Frostwind",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 368,
  bookIndex: 9,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
