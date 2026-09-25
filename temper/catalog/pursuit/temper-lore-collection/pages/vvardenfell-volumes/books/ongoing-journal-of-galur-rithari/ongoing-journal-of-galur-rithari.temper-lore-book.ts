import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ongoingJournalOfGalurRithari = {
  id: "01a0d5f7-aa99-751b-85c8-46e56949a1be",
  type: "page-type/temper-lore-book",
  slug: "ongoing-journal-of-galur-rithari",
  title: "Ongoing Journal of Galur Rithari",
  collection: "temper-lore-collection/vvardenfell-volumes",
  esoBookId: 4121,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
