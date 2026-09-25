import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToCaptainLeronus = {
  id: "01a0d60d-4aaf-7fd3-b82d-b5fb9ae86358",
  type: "page-type/temper-lore-book",
  slug: "letter-to-captain-leronus",
  title: "Letter to Captain Leronus",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 7860,
  bookIndex: 40,
  charted: true,
  quest: 7083,
  positions: "jsonl",
} as const satisfies TemperLoreBook
