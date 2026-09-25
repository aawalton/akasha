import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const journalOfAFallenOfficer = {
  id: "01a0d5f7-aa99-7631-acc2-4771f00f5fe8",
  type: "page-type/temper-lore-book",
  slug: "journal-of-a-fallen-officer",
  title: "Journal of a Fallen Officer",
  collection: "temper-lore-collection/vvardenfell-volumes",
  esoBookId: 4531,
  bookIndex: 56,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
